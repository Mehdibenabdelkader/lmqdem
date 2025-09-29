import { findProjectByName } from '../utils/projects.js';
import { formatProjectStatus } from '../utils/darija.js';

// Generate Darija response for project details
function generateKifachResponse(project, projectName) {
  if (!project) {
    return `🤷‍♂️ Ma lqitach had l-mchrou3 "${projectName}". Khassak tchecki lmachari3 li kaynin b /lmachari3.`;
  }
  
  const managerMention = `<@${project.managerId}>`;
  const channelMention = `<#${project.channelId}>`;
  const statusEmoji = formatProjectStatus(project.status);
  
  let response = `📋 **Kifach "${projectName}"?**\n\n`;
  response += `📌 **${project.name}**\n`;
  response += `👤 Manager: ${managerMention} (${project.manager})\n`;
  response += `📝 Description: ${project.description}\n`;
  response += `💬 Channel: ${channelMention}\n`;
  response += `📊 Status: ${statusEmoji}\n`;
  
  // Add tasks if any
  if (project.tasks && project.tasks.length > 0) {
    response += `\n📋 **Tasks (${project.tasks.length}):**\n`;
    project.tasks.slice(0, 5).forEach((task, index) => {
      const taskEmoji = task.status === 'completed' ? '✅' : 
                       task.status === 'in-progress' ? '🔄' : '⏳';
      response += `   ${index + 1}. ${taskEmoji} ${task.description}\n`;
    });
    if (project.tasks.length > 5) {
      response += `   ... and ${project.tasks.length - 5} more tasks\n`;
    }
  }
  
  // Add suggestions if any
  if (project.suggestions && project.suggestions.length > 0) {
    response += `\n💡 **Suggestions (${project.suggestions.length}):**\n`;
    project.suggestions.slice(0, 3).forEach((suggestion, index) => {
      const suggestionEmoji = suggestion.status === 'accepted' ? '✅' : 
                             suggestion.status === 'rejected' ? '❌' : '⏳';
      response += `   ${index + 1}. ${suggestionEmoji} ${suggestion.text}\n`;
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
        content: "❌ Khassak tdir project name! Usage: `/kifach [project name]`"
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
