// Add interface for tools
interface Tool {
    type: 'function';
    name: string;
    description: string;
    parameters?: {
      type: string;
      properties: Record<string, {
        type: string;
        description: string;
      }>;
    };
}

const toolDefinitions = {
    getCurrentTime: {
        description: 'Gets the current time in the user\'s timezone',
        parameters: {}
    },
    changeBackgroundColor: {
        description: 'Changes the background color of the page', 
        parameters: {
        color: { 
            type: 'string',
            description: 'Color value (hex, rgb, or color name)'
        }
        }
    },
    partyMode: {
        description: 'Triggers a confetti animation on the page',
        parameters: {}
    },
    launchWebsite: {
        description: 'Launches a website in the user\'s browser',
        parameters: {
        url: {
            type: 'string',
            description: 'The URL to launch'
        }
        }
    },
    copyToClipboard: {
        description: 'Copies text to the user\'s clipboard',
        parameters: {
        text: {
            type: 'string',
            description: 'The text to copy'
        }
        }
    },
    takeScreenshot: {
        description: 'Takes a screenshot of the current page',
        parameters: {}
    },
    scrapeWebsite: {
        description: 'Scrapes a URL and returns content in markdown and HTML formats',
        parameters: {
            url: {
                type: 'string',
                description: 'The URL to scrape'
            }
        }
    },
    generateImage: {
        description: 'Generates an image using AI based on a text prompt',
        parameters: {
            prompt: {
                type: 'string',
                description: 'The text description of the image to generate'
            },
            guidance: {
                type: 'number',
                description: 'Optional guidance scale for image generation (default: 3.5)'
            }
        }
    },
    createImageMask: {
        description: 'Generates a mask for an image using AI based on a text prompt',
        parameters: {
            prompt: {
                type: 'string',
                description: 'The text description of the mask to generate'
            }
        }
    },
    inpaintImage: {
        description: 'IMPORTANT: This function only needs a prompt - it automatically uses the most recent image and mask. If those are missing, it will return an error, but the model should NOT ask for new ones. Just provide the prompt and let the function handle the validation.',
        parameters: {
            prompt: {
                type: 'string',
                description: 'Description of what to change in the image'
            }
        }
    }
} as const;

const tools: Tool[] = Object.entries(toolDefinitions).map(([name, config]) => ({
    type: "function",
    name,
    description: config.description,
    parameters: {
    type: 'object',
    properties: config.parameters
    }
}));


export type { Tool };
export { tools };
