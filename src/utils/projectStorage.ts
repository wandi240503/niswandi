import { Project } from '../types/portfolio';
import { PROJECTS as DEFAULT_PROJECTS } from '../data/portfolioData';

const STORAGE_KEY = 'niswandi_custom_projects';

export const getStoredProjects = (): Project[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return DEFAULT_PROJECTS;
    }
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_PROJECTS;
  } catch (e) {
    console.error("Error reading projects from storage", e);
    return DEFAULT_PROJECTS;
  }
};

export const saveProjectsToStorage = (projects: Project[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch (e) {
    console.error("Error saving projects to storage", e);
  }
};

export const addOrUpdateProject = (project: Project): Project[] => {
  const current = getStoredProjects();
  const existingIndex = current.findIndex((p) => p.id === project.id);
  let updated: Project[];

  if (existingIndex >= 0) {
    updated = [...current];
    updated[existingIndex] = project;
  } else {
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
  localStorage.removeItem(STORAGE_KEY);
  return DEFAULT_PROJECTS;
};

