import { Injectable, BadRequestException } from '@nestjs/common';
import * as Multer from 'multer';
import { SupabaseService } from '../supabase.service';
import { randomBytes } from 'crypto';

@Injectable()
export class DocumentService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async getAllDocuments() {
    const supabase = this.supabaseService.getClient();
    const { data, error } = await supabase.from('documents').select('*').order('created_at', { ascending: false });
    if (error) throw new BadRequestException(error.message);
    return data;
  }

  async handleUpload(file: Multer.File, body: any) {
    if (!file) throw new BadRequestException('File is required');
    const { title, description, type, sender_name, recipient_name } = body;
    if (!title || !type || !sender_name) throw new BadRequestException('Missing required fields');

    // Simulate file upload: in real app, upload to S3 or Supabase Storage and get file_url
    const file_url = `/uploads/${file.originalname}`;

    // Generate a random tracking code
    const tracking_code = randomBytes(6).toString('hex').toUpperCase();

    // Insert into Supabase
    const supabase = this.supabaseService.getClient();
    const { data, error } = await supabase
      .from('documents')
      .insert([
        {
          tracking_code,
          title,
          type,
          sender_name,
          recipient_name,
          description,
          file_url,
          status: 'in_transit',
        },
      ])
      .select();

    if (error) throw new BadRequestException(error.message);
    return {
      message: 'File uploaded',
      tracking_code,
      document: data?.[0],
    };
  }
}
