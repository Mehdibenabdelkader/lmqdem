import { loadProjects, saveProjects } from '../utils/projects.js';
import { generateDarijaResponse } from '../utils/darija.js';
import { DiscordRequest } from '../utils.js';

// Generate Darija response for suggestion posting
function generateChbanlikResponse(task, channelId) {
  const channelMention = `<#${channelId}>`;
  
  return `✅ **safi sir tan3iyto lik** Check the suggestions channel for discussion.`;
}

// Add suggestion to projects data
function addSuggestionToData(task, userId, username) {
  const data = loadProjects();
  
  // Create suggestion object
  const suggestion = {
    id: Date.now(), // Simple ID generation
    text: task,
    suggestedBy: username,
    suggestedById: userId,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  
  // Add to general suggestions (not project-specific)
  if (!data.suggestions) {
    data.suggestions = [];
  }
  
  data.suggestions.push(suggestion);
  
  // Save updated data
  return saveProjects(data);
}

// Generate the message to post in the suggestions channel
function generateSuggestionMessage(task, user) {
  const userMention = `<@${user.id}>`;
  const username = user.username || 'Unknown User';
  
  return `💡 **New Suggestion from ${userMention}**\n\n` +
         `📝 **Task/Idea:** ${task}\n`;
}

// Post message to suggestions channel
async function postToSuggestionsChannel(task, user, suggestionsChannelId) {
  try {
    const message = generateSuggestionMessage(task, user);
    const endpoint = `channels/${suggestionsChannelId}/messages`;
    
    await DiscordRequest(endpoint, {
      method: 'POST',
      body: {
        content: message
      }
    });
    
    return true;
  } catch (error) {
    console.error('Error posting to suggestions channel:', error);
    return false;
  }
}

// Main command handler
export async function handleChbanlikCommand(interaction) {
  const task = interaction.data.options?.[0]?.value;
  
  if (!task) {
    return {
      type: 4, // CHANNEL_MESSAGE_WITH_SOURCE
      data: {
        content: "kmelia lcommand `/chbanlik [task]`"
      }
    };
  }
  
  // Get user info
  const user = interaction.member?.user || interaction.user;
  const userId = user.id;
  const username = user.username || 'Unknown User';
  
  // Add suggestion to data
  const success = addSuggestionToData(task, userId, username);
  
  if (!success) {
    return {
      type: 4, // CHANNEL_MESSAGE_WITH_SOURCE
      data: {
        content: "Hda elia, Error f saving suggestion. 3awed jreb!"
      }
    };
  }
  
  // Get suggestions channel ID from settings
  const data = loadProjects();
  const settings = data.settings || {};
  const suggestionsChannelId = settings.suggestionsChannelId;
  
  // Post to suggestions channel if configured
  if (suggestionsChannelId && suggestionsChannelId !== '111111111111111111') {
    const posted = await postToSuggestionsChannel(task, user, suggestionsChannelId);
    
    if (!posted) {
      return {
        type: 4, // CHANNEL_MESSAGE_WITH_SOURCE
        data: {
          content: "Hda elia, Error f posting to suggestions channel. Checki channel ID!"
        }
      };
    }
  }
  
  // Generate response for the user
  const userResponse = generateChbanlikResponse(task, suggestionsChannelId || 'general');
  
  return {
    type: 4, // CHANNEL_MESSAGE_WITH_SOURCE
    data: {
      content: userResponse
    }
  };
}
