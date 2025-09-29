import { findProjectByKeyword } from '../utils/projects.js';
import { formatProjectStatus } from '../utils/darija.js';

// Generate Darija response
function generateChkonResponse(project, keyword) {
  if (!project) {
    return `Hda elia, ma3rftch chkon kheddam ela "${keyword}". tchecki elayach kheddamin b /lmachari3.`;
  }
  
  const managerMention = `<@${project.managerId}>`;
  const channelMention = `<#${project.channelId}>`;
  
  return `🔍 **Chkon li kheddam ela "${keyword}"?**\n\n` +
         `📌 **${project.name}**\n` +
         `👤 mol chi: ${managerMention} (${project.manager})\n` +
         `📝 Description: ${project.description}\n` +
         `💬 Channel: ${channelMention}\n`;
}

// Main command handler
export async function handleChkonCommand(interaction) {
  const keyword = interaction.data.options?.[0]?.value;
  
  if (!keyword) {
    return {
      type: 4, // CHANNEL_MESSAGE_WITH_SOURCE
      data: {
        content: "❌ dir chi projet Usage: `/chkon [topic]`"
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
