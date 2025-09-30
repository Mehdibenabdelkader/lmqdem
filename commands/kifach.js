import { findProjectByName } from '../utils/projects.js';
import { formatProjectStatus } from '../utils/darija.js';

// Generate Darija response for project details
function generateKifachResponse(project, projectName) {
  if (!project) {
    return `Ma lqitch had lmchrou3 "${projectName}". chof elayach kheddamin /lmachari3.`;
  }
  
  const managerMention = `<@${project.managerId}>`;
  const channelMention = `<#${project.channelId}>`;
  const statusEmoji = formatProjectStatus(project.status);
  
  let response = `**${project.name}**\n`;
  response += `mol chi: ${managerMention} (${project.manager})\n`;
  response += `Description: ${project.description}\n`;
  response += `Channel: ${channelMention}\n`;
  response += `Status: ${statusEmoji}\n`;
  
  
  // Add suggestions if any
  if (project.suggestions && project.suggestions.length > 0) {
    response += `\n**Suggestions (${project.suggestions.length}):**\n`;
    project.suggestions.slice(0, 3).forEach((suggestion, index) => {
      const suggestionStatus = suggestion.status === 'accepted' ? '[ACCEPTED]' : 
                             suggestion.status === 'rejected' ? '[REJECTED]' : '[PENDING]';
      response += `   ${index + 1}. ${suggestionStatus} ${suggestion.text}\n`;
    });
    if (project.suggestions.length > 3) {
      response += `   ... and ${project.suggestions.length - 3} more suggestions\n`;
    }
  }
  
  return response;
}

// Main command handler
export async function handleKifachCommand(interaction) {
  const projectName = interaction.data.options?.[0]?.value;
  
  if (!projectName) {
    return {
      type: 4, // CHANNEL_MESSAGE_WITH_SOURCE
      data: {
        content: "zid smiya dlprojet! Usage: `/kifach [project name]`"
      }
    };
  }
  
  const project = findProjectByName(projectName);
  const response = generateKifachResponse(project, projectName);
  
  return {
    type: 4, // CHANNEL_MESSAGE_WITH_SOURCE
    data: {
      content: response
    }
  };
}
