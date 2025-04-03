import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}

    // Generate a JWT token
    async generateToken(payload: any): Promise<string> {
        return this.jwtService.signAsync(payload);
    }

    // Validate a JWT token
    async validateToken(token: string): Promise<any> {
        try {
            return this.jwtService.verifyAsync(token);
        } catch (error) {
            throw new Error('Invalid token');
        }
    }
}