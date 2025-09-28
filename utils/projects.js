import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load projects data from JSON file
export function loadProjects() {
  try {
    const dataPath = path.join(__dirname, '../data/projects.json');
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading projects:', error);
    return { projects: {}, settings: {} };
  }
}

// Save projects data to JSON file
export function saveProjects(data) {
  try {
    const dataPath = path.join(__dirname, '../data/projects.json');
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving projects:', error);
    return false;
  }
}

// Get all projects
export function getAllProjects() {
  const data = loadProjects();
  return data.projects || {};
}

// Get project by key
export function getProject(projectKey) {
  const data = loadProjects();
  return data.projects?.[projectKey] || null;
}

// Find project by keyword (used by chkon command)
export function findProjectByKeyword(keyword) {
  const projects = getAllProjects();
  const searchKeyword = keyword.toLowerCase();
  
  for (const [projectKey, project] of Object.entries(projects)) {
    const projectName = project.name.toLowerCase();
    const projectDesc = project.description.toLowerCase();
    const projectKeywords = project.keywords.map(k => k.toLowerCase());
    
    if (projectName.includes(searchKeyword) || 
        projectDesc.includes(searchKeyword) || 
        projectKeywords.some(k => k.includes(searchKeyword))) {
      return project;
    }
  }
  
  return null;
}

// Check if user is a manager
export function isUserManager(userId, projectKey = null) {
  const data = loadProjects();
  
  if (projectKey) {
    // Check if user is manager of specific project
    const project = data.projects?.[projectKey];
    return project?.managerId === userId;
  } else {
    // Check if user is manager of any project
    const projects = data.projects || {};
    return Object.values(projects).some(project => project.managerId === userId);
  }
}

// Get user's managed projects
export function getUserManagedProjects(userId) {
  const projects = getAllProjects();
  const managedProjects = [];
  
  for (const [key, project] of Object.entries(projects)) {
    if (project.managerId === userId) {
      managedProjects.push({ key, ...project });
    }
  }
  
  return managedProjects;
}

// Add new project
export function addProject(projectData) {
  const data = loadProjects();
  const projectKey = projectData.key || projectData.name.toLowerCase().replace(/\s+/g, '-');
  
  data.projects[projectKey] = {
    ...projectData,
    tasks: [],
    suggestions: [],
    status: 'active'
  };
  
  return saveProjects(data) ? projectKey : null;
}

// Update project
export function updateProject(projectKey, updates) {
  const data = loadProjects();
  
  if (!data.projects[projectKey]) {
    return false;
  }
  
  data.projects[projectKey] = {
    ...data.projects[projectKey],
    ...updates
  };
  
  return saveProjects(data);
}

// Delete project
export function deleteProject(projectKey) {
  const data = loadProjects();
  
  if (!data.projects[projectKey]) {
    return false;
  }
  
  delete data.projects[projectKey];
  return saveProjects(data);
}

// Add task to project
export function addTaskToProject(projectKey, taskData) {
  const data = loadProjects();
  const project = data.projects[projectKey];
  
  if (!project) {
    return false;
  }
  
  const newTaskId = Math.max(...project.tasks.map(t => t.id), 0) + 1;
  const newTask = {
    id: newTaskId,
    ...taskData,
    status: 'pending'
  };
  
  project.tasks.push(newTask);
  return saveProjects(data) ? newTaskId : null;
}

// Update task status
export function updateTaskStatus(projectKey, taskId, status) {
  const data = loadProjects();
  const project = data.projects[projectKey];
  
  if (!project) {
    return false;
  }
  
  const task = project.tasks.find(t => t.id === taskId);
  if (!task) {
    return false;
  }
  
  task.status = status;
  return saveProjects(data);
}

// Get project settings
export function getSettings() {
  const data = loadProjects();
  return data.settings || {};
}
