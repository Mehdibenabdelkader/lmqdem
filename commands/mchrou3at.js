import { getAllProjects } from '../utils/projects.js';
import { formatProjectStatus } from '../utils/darija.js';

// Generate Darija response for listing all projects
function generateMchrou3atResponse(projects) {
  if (Object.keys(projects).length === 0) {
    return `📌 **Lmchrou3at li kaynin daba:**\n\n❌ Ma kaynin walou mchrou3at daba. Khassna nzido chi haja!`;
  }

  let response = `📌 **Lmchrou3at li kaynin daba:**\n\n`;
  
  let projectCount = 1;
  for (const [projectKey, project] of Object.entries(projects)) {
    const managerMention = `<@${project.managerId}>`;
    const channelMention = `<#${project.channelId}>`;
    const statusEmoji = formatProjectStatus(project.status);
    
    response += `**${projectCount}.** 📋 **${project.name}**\n`;
    response += `   👤 Manager: ${managerMention} (${project.manager})\n`;
    response += `   💬 Channel: ${channelMention}\n`;
    response += `   📊 Status: ${statusEmoji}\n`;
    response += `   📝 ${project.description}\n\n`;
    
    projectCount++;
  }
  
  response += `💡 **Tip:** Dir \`/chkon [topic]\` bach tshuf chkon li kaydir chi haja specific!`;
  
  return response;
}

// Main command handler
export function handleMchrou3atCommand(interaction) {
  const projects = getAllProjects();
  const response = generateMchrou3atResponse(projects);
  
  return {
    type: 4, // CHANNEL_MESSAGE_WITH_SOURCE
    data: {
      content: response
    }
  };
}
