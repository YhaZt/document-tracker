import { Module } from '@nestjs/common';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { SupabaseService } from '../supabase.service';

@Module({
  controllers: [DocumentController],
  providers: [DocumentService, SupabaseService],
})
export class DocumentModule {}
