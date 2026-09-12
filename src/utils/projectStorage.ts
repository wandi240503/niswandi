import { Project } from '../types/portfolio';
import { PROJECTS as DEFAULT_PROJECTS } from '../data/portfolioData';

const STORAGE_KEY = 'niswandi_custom_projects';

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
      // Even if user deleted projects or has custom count, return the actual stored list
      return parsed;
    }
    return DEFAULT_PROJECTS;
  } catch (e) {
    console.error("Error reading projects from storage", e);
    return DEFAULT_PROJECTS;
  }
};

export const saveProjectsToStorage = (projects: Project[]): boolean => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('niswandi_projects_updated', { detail: projects }));
    }
    return true;
  } catch (e) {
    console.error("Error saving projects to storage (likely quota exceeded)", e);
    return false;
  }
};

export const addOrUpdateProject = (project: Project): Project[] => {
  const current = getStoredProjects();
  const existingIndex = current.findIndex((p) => p.id === project.id);
  let updated: Project[];

  if (existingIndex >= 0) {
    // Preserve any existing fields not present in update
    updated = [...current];
    updated[existingIndex] = {
      ...current[existingIndex],
      ...project,
    };
  } else {
    // New project added: place at the top of list
    updated = [project, ...current];
  }

  saveProjectsToStorage(updated);
  return updated;
};

export const deleteStoredProject = (id: string): Project[] => {
  const current = getStoredProjects();
  const filtered = current.filter((p) => p.id !== id);
  saveProjectsToStorage(filtered);
  return filtered;
};

export const resetStoredProjects = (): Project[] => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PROJECTS));
  return DEFAULT_PROJECTS;
};
