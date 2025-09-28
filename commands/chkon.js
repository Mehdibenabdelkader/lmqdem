import { findProjectByKeyword } from '../utils/projects.js';
import { formatProjectStatus } from '../utils/darija.js';

// Generate Darija response
function generateChkonResponse(project, keyword) {
  if (!project) {
    return `🤷‍♂️ Ma 3reftch chkon li kaydir "${keyword}". Khassak tchecki l-mchrou3at li kaynin b /mchrou3at.`;
  }
  
  const managerMention = `<@${project.managerId}>`;
  const channelMention = `<#${project.channelId}>`;
  
  return `🔍 **Chkon li kaydir "${keyword}"?**\n\n` +
         `📌 **${project.name}**\n` +
         `👤 Manager: ${managerMention} (${project.manager})\n` +
         `📝 Description: ${project.description}\n` +
         `💬 Channel: ${channelMention}\n` +
         `📊 Status: ${formatProjectStatus(project.status)}`;
}

// Main command handler
export function handleChkonCommand(interaction) {
  const keyword = interaction.data.options?.[0]?.value;
  
  if (!keyword) {
    return {
      type: 4, // CHANNEL_MESSAGE_WITH_SOURCE
      data: {
        content: "❌ Khassak tdir keyword! Usage: `/chkon [topic]`"
      }
    };
  }
  
  const project = findProjectByKeyword(keyword);
  const response = generateChkonResponse(project, keyword);
  
  return {
    type: 4, // CHANNEL_MESSAGE_WITH_SOURCE
    data: {
      content: response
    }
  };
}
