import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async register(fullName: string, email: string, password: string) {
    const { data: existingUser } = await this.supabaseService.getClient()
      .from('account')
      .select('id')
      .eq('email', email)
      .single();
    if (existingUser) {
      return { error: 'Email already registered.' };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const { data, error } = await this.supabaseService.getClient()
      .from('account')
      .insert({ full_name: fullName, email, password: hashedPassword })
      .select();
    if (error) return { error: error.message };
    return { message: 'Registration successful', user: data[0] };
  }

  async login(email: string, password: string) {
    const { data: user, error } = await this.supabaseService.getClient()
      .from('account')
      .select('*')
      .eq('email', email)
      .single();
    if (error || !user) return { error: 'Invalid email or password.' };
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return { error: 'Invalid email or password.' };
    return { message: 'Login successful', user };
  }

  async changePassword(email: string, newPassword: string) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const { error } = await this.supabaseService.getClient()
      .from('account')
      .update({ password: hashedPassword })
      .eq('email', email);
    if (error) return { error: error.message };
    return { message: 'Password changed successfully' };
  }

  async forgotPassword(email: string) {
    // In production, generate a token and send email. Here, just check if user exists.
    const { data: user, error } = await this.supabaseService.getClient()
      .from('account')
      .select('id')
      .eq('email', email)
      .single();
    if (error || !user) return { error: 'Email not found.' };
    // Simulate sending email
    return { message: 'Password reset link sent (simulated).' };
  }
}
