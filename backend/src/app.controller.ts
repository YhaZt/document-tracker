import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { SupabaseService } from './supabase.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly supabaseService: SupabaseService,
  ) {}

  @Get()
  async getHello(): Promise<any> {
    // Example: fetch all rows from a table called 'test_table'
    const { data, error } = await this.supabaseService.getClient()
      .from('test_table')
      .select('*');
    if (error) {
      return { error: error.message };
    }
    return data;
  }
}
