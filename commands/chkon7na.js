import { generateDarijaResponse } from '../utils/darija.js';

// Generate community description response in Darija
function generateChkon7naResponse() {
  return `**Chkon 7na? - Community Description**\n\n` +
         `**Ahlan!** Ana lmqdem, wa ana bot li kay3awn f had lcommunity!\n\n` +
         `**Ach kaydir had lcommunity:**\n` +
         `• **Lmachari3** - Kayn lmachari3 ktar f had lcommunity, kul wa7ed kaydir chi haja specific\n` +
         `• **Teamwork** - Kan3awno b3dna bach nkmlo lmachari3 b tari9a mzyana\n` +
         `• **Learning** - Kan3almo mn b3dna w kanpartageo lma3lumat\n` +
         `• **Support** - Kan3awno b3dna f kul chi w kan7lolo lproblems\n\n` +
         `**Ach kaydir lmqdem (ana):**\n`;
}

// Main command handler
export async function handleChkon7naCommand(interaction) {
  const response = generateChkon7naResponse();
  
  return {
    type: 4, // CHANNEL_MESSAGE_WITH_SOURCE
    data: {
      content: response
    }
  };
}
