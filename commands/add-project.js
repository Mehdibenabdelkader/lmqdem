import { InteractionResponseType, InteractionResponseFlags } from 'discord-interactions';
import { addProject, getSettings } from '../utils/projects.js';
import { generateDarijaResponse } from '../utils/darija.js';

export async function handleAddProjectCommand(interaction) {
  // Debug: Log the interaction structure
  console.log('Add project command - Full interaction:', JSON.stringify(interaction, null, 2));
  
  const member = interaction.member;
  const data = interaction.data;
  const user = member?.user || interaction.user;
  const userId = user.id;
  const options = data.options || [];
  
  // Debug: Log member roles
  console.log('Member roles:', member?.roles);
  console.log('User ID:', userId);
  
  // Get project details from command options
  const nameOption = options.find(opt => opt.name === 'name');
  const descriptionOption = options.find(opt => opt.name === 'description');
  const managerOption = options.find(opt => opt.name === 'manager');
  const channelOption = options.find(opt => opt.name === 'channel');
  const keywordsOption = options.find(opt => opt.name === 'keywords');
  
  const projectName = nameOption?.value;
  const projectDescription = descriptionOption?.value;
  const managerName = managerOption?.value;
  const channelName = channelOption?.value;
  const keywordsString = keywordsOption?.value;
  
  // Check if user has the required role
  const settings = getSettings();
  const requiredRoleId = settings.managerRoleId;
  
  // Debug: Log role checking details
  console.log('Required role ID:', requiredRoleId);
  console.log('User roles:', member?.roles);
  console.log('Settings:', settings);
  
  // Check if user has the required role by ID
  const hasRequiredRole = member?.roles?.includes(requiredRoleId) || false;
  
  console.log('Has required role:', hasRequiredRole);
  
  if (!hasRequiredRole) {
    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: generateDarijaResponse('error', { 
          message: `Ma 3andkch l7a9 bach tzid machari3. Khassk tkun 3andek role ID "${requiredRoleId}"` 
        }),
        flags: InteractionResponseFlags.EPHEMERAL
      }
    };
  }
  
  // Validate required fields
  if (!projectName) {
    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: generateDarijaResponse('error', { 
          message: 'L ism dyal l machari3 wajeb!' 
        }),
        flags: InteractionResponseFlags.EPHEMERAL
      }
    };
  }
  
  // Parse keywords
  const keywords = keywordsString ? 
    keywordsString.split(',').map(k => k.trim()).filter(k => k.length > 0) : 
    [];
  
  // Create project data
  const projectData = {
    name: projectName,
    description: projectDescription || '',
    manager: managerName || user.username,
    managerId: userId,
    keywords: keywords,
    channel: channelName ? `#${channelName}` : '',
    channelId: '', // This would need to be resolved from channel name
    status: 'active'
  };
  
  try {
    // Add the project
    const projectKey = addProject(projectData);
    
    if (projectKey) {
      return {
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: generateDarijaResponse('success', { 
            message: `L machari3 "${projectName}" tzad b najah! Key: ${projectKey}` 
          })
        }
      };
    } else {
      return {
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: generateDarijaResponse('error', { 
            message: 'Chi haja machi tal lhih f l7fz dyal l machari3' 
          }),
          flags: InteractionResponseFlags.EPHEMERAL
        }
      };
    }
  } catch (error) {
    console.error('Error adding project:', error);
    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: generateDarijaResponse('error', { 
          message: 'Chi haja machi tal lhih, 3awd jereb!' 
        }),
        flags: InteractionResponseFlags.EPHEMERAL
      }
    };
  }
}
