import { Project } from '../types/portfolio';
import { PROJECTS as DEFAULT_PROJECTS } from '../data/portfolioData';

const STORAGE_KEY = 'niswandi_custom_projects';
const IMAGE_KEY_PREFIX = 'niswandi_img_';

/**
 * Images are stored separately in localStorage under individual keys
 * to avoid exceeding the ~5MB single-key quota. The project data
 * stores only a reference key like "__img__proj-12345" which maps
 * to the actual base64 data stored under "niswandi_img_proj-12345".
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

/** Resolve an image field: if it's a ref marker, load the actual base64 from its own key. */
export const resolveImage = (imageSrc: string): string => {
  if (isImageRef(imageSrc)) {
    const pid = projectIdFromRef(imageSrc);
    const stored = localStorage.getItem(imageKeyForProject(pid));
    if (stored) return stored;
    // Fallback if the image key was somehow lost
    return '/images/fintech-app.png';
  }
  return imageSrc;
};

/** Save a base64 image to its own localStorage key. Returns true on success. */
const saveImageSeparately = (projectId: string, base64: string): boolean => {
  try {
    localStorage.setItem(imageKeyForProject(projectId), base64);
    return true;
  } catch (e) {
    console.error(`Failed to save image for project ${projectId}:`, e);
    return false;
  }
};

/** Remove the image key when a project is deleted. */
const removeImageKey = (projectId: string): void => {
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
      // First time: initialize storage with default projects
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PROJECTS));
      return DEFAULT_PROJECTS;
    }
    const parsed = JSON.parse(saved);
    if (Array.isArray(parsed)) {
      return parsed.map(hydrateProject);
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
