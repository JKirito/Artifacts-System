import { Request, Response } from 'express';
import { generateResponse } from '../services/openai';

/**
 * Handle prompt requests to OpenAI
 * @param req Express request
 * @param res Express response
 */
export async function handlePrompt(req: Request, res: Response) {
  try {
    const { prompt } = req.body;
    
    // Validate input
    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ 
        error: 'Invalid request. Please provide a prompt in the request body.' 
      });
    }

    // Generate response from OpenAI
    const response = await generateResponse(prompt);
    
    // Return the response
    return res.status(200).json({ 
      success: true, 
      response 
    });
  } catch (error) {
    console.error('Error in handlePrompt:', error);
    return res.status(500).json({ 
      error: 'Failed to process your request. Please try again later.' 
    });
  }
}
