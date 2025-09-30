// Darija utility functions for lmqdem bot

// Common Darija phrases and responses
export const DARIJA_PHRASES = {
  WELCOME: "Ahlan! m3ak lmqdem, ach 7eb lkhater",
  ERROR: "chi haja machi tal lhih, 3awd jereb",
  NO_PERMISSION: "Ma 3andkch lpermission bach tdir hadi. Khassk tkun manager",
  PROJECT_NOT_FOUND: "Ma lqitch had lmchrou3. Checki lmachari3 li kaynin! (/lmachari3) ",
  SUCCESS: "Nadi canadi",
  LOADING: "daqiqa...",
  THANKS: "Lah y7fdek",
  HELP: "m3ak lmqdem! kayn man9diw? Dir /lmachari3 bach tshuf kulchi!"
};

// Generate friendly Darija responses
export function generateDarijaResponse(type, context = {}) {
  switch (type) {
    case 'welcome':
      return DARIJA_PHRASES.WELCOME;
    
    case 'error':
      return `${DARIJA_PHRASES.ERROR} ${context.message || ''}`;
    
    case 'no_permission':
      return `${DARIJA_PHRASES.NO_PERMISSION} ${context.requiredRole || ''}`;
    
    case 'project_not_found':
      return `${DARIJA_PHRASES.PROJECT_NOT_FOUND} ${context.searchTerm || ''}`;
    
    case 'success':
      return `${DARIJA_PHRASES.SUCCESS} ${context.action || ''}`;
    
    case 'loading':
      return `${DARIJA_PHRASES.LOADING} ${context.action || ''}`;
    
    case 'thanks':
      return DARIJA_PHRASES.THANKS;
    
    case 'help':
      return DARIJA_PHRASES.HELP;
    
    default:
      return "Had nwita mafhmthach. 3awd jereb";
  }
}

// Format project status in Darija
export function formatProjectStatus(status) {
  const statusMap = {
    'active': 'Active',
    'inactive': 'Inactive',
    'completed': 'Completed',
    'on-hold': 'On Hold',
    'planning': 'Planning'
  };
  
  return statusMap[status] || 'Unknown';
}


// Generate suggestion status indicator
export function getSuggestionStatusIndicator(status) {
  const statusMap = {
    'pending': '[PENDING]',
    'accepted': '[ACCEPTED]',
    'rejected': '[REJECTED]',
    'in-progress': '[IN PROGRESS]'
  };
  
  return statusMap[status] || '[UNKNOWN]';
}

// Format date in a friendly way
export function formatDate(dateString) {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return `Overdue by ${Math.abs(diffDays)} days`;
    } else if (diffDays === 0) {
      return 'Due today';
    } else if (diffDays === 1) {
      return 'Due tomorrow';
    } else {
      return `Due in ${diffDays} days`;
    }
  } catch (error) {
    return dateString;
  }
}
