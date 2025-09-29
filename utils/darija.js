// Darija utility functions for Lm9adem bot

// Common Darija phrases and responses
export const DARIJA_PHRASES = {
  WELCOME: "Ahlan! Ana Lm9adem, n3awn fik f l-lmachari3 dyalna! 🎉",
  ERROR: "Oups! Hada mashi mzyan, 3awed tjarreb. 😅",
  NO_PERMISSION: "Ma 3andkch l-permission bach tdir hadi. Khassak tkun manager! 🚫",
  PROJECT_NOT_FOUND: "Ma lqitach had l-mchrou3. Checki l-lmachari3 li kaynin! 🔍",
  SUCCESS: "Mzyan! Dert hadi b success! ✅",
  LOADING: "Khassni nchecki... ⏳",
  THANKS: "Baraka lla fik! 🙏",
  HELP: "Ana Lm9adem! N3awn fik f l-lmachari3. Dir /lmachari3 bach tshuf kullchi! 🤖"
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
      return `${DARIJA_PHRASES.LOADING} ${context.task || ''}`;
    
    case 'thanks':
      return DARIJA_PHRASES.THANKS;
    
    case 'help':
      return DARIJA_PHRASES.HELP;
    
    default:
      return "Ma fhemtch hadi. 3awed tjarreb! 🤔";
  }
}

// Format project status in Darija
export function formatProjectStatus(status) {
  const statusMap = {
    'active': '🟢 Active',
    'inactive': '🔴 Inactive',
    'completed': '✅ Completed',
    'on-hold': '⏸️ On Hold',
    'planning': '📋 Planning'
  };
  
  return statusMap[status] || '❓ Unknown';
}

// Format task status in Darija
export function formatTaskStatus(status) {
  const statusMap = {
    'pending': '⏳ Pending',
    'in-progress': '🔄 In Progress',
    'completed': '✅ Completed',
    'cancelled': '❌ Cancelled'
  };
  
  return statusMap[status] || '❓ Unknown';
}

// Generate suggestion status emoji
export function getSuggestionStatusEmoji(status) {
  const emojiMap = {
    'pending': '⏳',
    'accepted': '✅',
    'rejected': '❌',
    'in-progress': '🔄'
  };
  
  return emojiMap[status] || '❓';
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
