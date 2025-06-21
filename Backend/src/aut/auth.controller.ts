// auth.controller.ts
import { Request, Response } from 'express';
import { ApiResponse } from '../helpers/ApiRespose';
import { AuthService } from './auth.service';

export class AuthController {
  static async loginUser(req: Request, res: Response): Promise<void> {
    const { email, password, googleID } = req.body;

    try {
      const result = await AuthService.login({ email, password, googleID });
      res.json(ApiResponse.ok('Login successful', result));
    } catch (error) {
      console.error('Error in loginUser:', error);
      res.status(400).json(
        ApiResponse.fail((error as Error).message)
      );
    }
  }
}