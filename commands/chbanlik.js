import { loadProjects, saveProjects } from '../utils/projects.js';
import { generateDarijaResponse } from '../utils/darija.js';
import { DiscordRequest } from '../utils.js';

// Generate Darija response for suggestion posting
function generateChbanlikResponse(task, channelId) {
  const channelMention = `<#${channelId}>`;
  
  return `💡 **Chbanlik hadi:**\n\n` +
         `📝 **Task/Idea:** ${task}\n` +
         `📢 **Posted in:** ${channelMention}\n` +
         `⏰ **Time:** ${new Date().toLocaleString('en-US', { 
           timeZone: 'Africa/Casablanca',
           year: 'numeric',
           month: 'long',
           day: 'numeric',
           hour: '2-digit',
           minute: '2-digit'
         })}\n\n` +
         `✅ **Suggestion posted successfully!** Check the suggestions channel for discussion.`;
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
  
  return `💡 **New Suggestion from ${username}**\n\n` +
         `📝 **Task/Idea:** ${task}\n` +
         `👤 **Suggested by:** ${userMention}\n` +
         `⏰ **Time:** ${new Date().toLocaleString('en-US', { 
           timeZone: 'Africa/Casablanca',
           year: 'numeric',
           month: 'long',
           day: 'numeric',
           hour: '2-digit',
           minute: '2-digit'
         })}\n\n` +
         `💬 **Discussion:** React with 👍 to support or 💬 to discuss!`;
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
        content: "❌ Khassak tdir task! Usage: `/chbanlik [task]`"
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
        content: "❌ Ma dert walou! Error f saving suggestion. 3awed tjarreb!"
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
          content: "❌ Ma dert walou! Error f posting to suggestions channel. Checki l-channel ID!"
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
