import { Project } from '../types/portfolio';
import { PROJECTS as DEFAULT_PROJECTS } from '../data/portfolioData';
import { saveHdImage, getCachedHdImageSync, deleteHdImage, clearAllHdImages } from './imageDb';

const STORAGE_KEY = 'niswandi_custom_projects_v5';
const IMAGE_KEY_PREFIX = 'niswandi_img_';

const DUMMY_IDS = new Set([
  'fintech-mobile-app',
  'ecommerce-dashboard',
  'company-profile-website',
  'travel-mobile-app',
  'brand-identity-guidelines',
  'task-management-app'
]);

/**
 * Images are stored in high-capacity IndexedDB and mirrored to localStorage
 * keys when size permits. Project data stores a reference key (__img__proj-123)
 * ensuring no single storage limit is ever exceeded.
 */

// ─── Image helpers ──────────────────────────────────────────────

const isInlineImage = (src: string): boolean =>
  src.startsWith('data:image/');

const imageKeyForProject = (projectId: string): string =>
  `${IMAGE_KEY_PREFIX}${projectId}`;

const imageRefMarker = (projectId: string): string =>
  `__img__${projectId}`;

const isImageRef = (src: string): boolean =>
  src.startsWith('__img__');

const projectIdFromRef = (ref: string): string =>
  ref.replace('__img__', '');

/** Resolve an image field: if it's a ref marker, load the actual base64 from cache or storage. */
export const resolveImage = (imageSrc: string): string => {
  if (isImageRef(imageSrc)) {
    const pid = projectIdFromRef(imageSrc);
    // 1. Check fast in-memory cache (from IndexedDB)
    const cached = getCachedHdImageSync(pid);
    if (cached) return cached;

    // 2. Check localStorage key
    const stored = localStorage.getItem(imageKeyForProject(pid));
    if (stored) return stored;

    // Fallback if the image key was somehow lost
    return '/images/fintech-app.png';
  }
  return imageSrc;
};

/** Save a base64 image to IndexedDB and fallback localStorage. Returns true on success. */
const saveImageSeparately = (projectId: string, base64: string): boolean => {
  // 1. Save Full HD image to IndexedDB
  saveHdImage(projectId, base64);

  // 2. Also try localStorage fallback
  try {
    localStorage.setItem(imageKeyForProject(projectId), base64);
  } catch (_) {
    // LocalStorage quota might be tight, but IndexedDB safely holds the HD image
  }
  return true;
};

/** Remove the image key when a project is deleted. */
const removeImageKey = (projectId: string): void => {
  deleteHdImage(projectId);
  try {
    localStorage.removeItem(imageKeyForProject(projectId));
  } catch (_) { /* ignore */ }
};

// ─── Core storage ───────────────────────────────────────────────

/**
 * Prepare a project for storage: if image is inline base64,
 * save it separately and replace the field with a ref marker.
 */
const prepareProjectForStorage = (project: Project): Project => {
  if (isInlineImage(project.image)) {
    const saved = saveImageSeparately(project.id, project.image);
    if (saved) {
      return { ...project, image: imageRefMarker(project.id) };
    }
    // If image save failed, keep a fallback path instead of
    // stuffing the giant base64 into the main JSON
    console.warn('Image too large to store, using fallback placeholder.');
    return { ...project, image: '/images/fintech-app.png' };
  }
  return project;
};

/**
 * Hydrate a project from storage: resolve ref markers back
 * to their actual base64 images for display.
 */
const hydrateProject = (project: Project): Project => {
  return { ...project, image: resolveImage(project.image) };
};

export const getStoredProjects = (): Project[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === null) {
      // First time on v3: check if old key has custom projects
      const oldSaved = localStorage.getItem('niswandi_custom_projects');
      if (oldSaved) {
        try {
          const oldParsed = JSON.parse(oldSaved);
          if (Array.isArray(oldParsed) && oldParsed.length > 0) {
            const customItems = oldParsed.filter((p: Project) =>
              p.id.startsWith('proj-') || p.id.includes('recaffe') || p.id.includes('ismi')
            );
            if (customItems.length > 0) {
              const combined = [
                ...customItems,
                ...DEFAULT_PROJECTS.filter((d) => !customItems.some((c: Project) => c.id === d.id))
              ];
              localStorage.setItem(STORAGE_KEY, JSON.stringify(combined));
              return combined.map(hydrateProject);
            }
          }
        } catch (_) {}
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PROJECTS));
      return DEFAULT_PROJECTS;
    }
    const parsed = JSON.parse(saved);
    if (Array.isArray(parsed)) {
      const cleaned = parsed.filter((p: Project) => !DUMMY_IDS.has(p.id));
      return cleaned.map(hydrateProject);
    }
    return DEFAULT_PROJECTS;
  } catch (e) {
    console.error("Error reading projects from storage", e);
    return DEFAULT_PROJECTS;
  }
};

export const saveProjectsToStorage = (projects: Project[]): boolean => {
  // Prepare all projects (extract images to separate keys)
  const prepared = projects.map(prepareProjectForStorage);

  try {
    const json = JSON.stringify(prepared);
    localStorage.setItem(STORAGE_KEY, json);

    // Verify the write succeeded by reading back
    const verify = localStorage.getItem(STORAGE_KEY);
    if (verify !== json) {
      console.error('Storage verification failed — data mismatch after write.');
      return false;
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('niswandi_projects_updated'));
    }
    return true;
  } catch (e) {
    console.error("Error saving projects to storage (likely quota exceeded)", e);
    return false;
  }
};

export const addOrUpdateProject = (project: Project): { success: boolean; projects: Project[] } => {
  const current = getStoredProjects();
  const existingIndex = current.findIndex((p) => p.id === project.id);
  let updated: Project[];

  if (existingIndex >= 0) {
    updated = [...current];
    updated[existingIndex] = {
      ...current[existingIndex],
      ...project,
    };
  } else {
    updated = [project, ...current];
  }

  const success = saveProjectsToStorage(updated);
  if (!success) {
    // Return original data if save failed
    return { success: false, projects: current };
  }
  // Re-read from storage to get hydrated (resolved image refs) projects
  return { success: true, projects: getStoredProjects() };
};

export const deleteStoredProject = (id: string): Project[] => {
  const current = getStoredProjects();
  const filtered = current.filter((p) => p.id !== id);
  removeImageKey(id);
  saveProjectsToStorage(filtered);
  return getStoredProjects();
};

export const resetStoredProjects = (): Project[] => {
  clearAllHdImages();
  // Clean up all stored image keys
  try {
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (key && key.startsWith(IMAGE_KEY_PREFIX)) {
        localStorage.removeItem(key);
      }
    }
  } catch (_) { /* ignore */ }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PROJECTS));
  return DEFAULT_PROJECTS;
};
