
import { Controller, Post, Get, UseInterceptors, UploadedFile, Body, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import * as Multer from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentService } from './document.service';

@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @UseGuards(require('../auth/jwt-auth.guard').JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadDocument(
    @UploadedFile() file: Multer.File,
    @Body() body: any,
    @Req() req: Request
  ) {
    // req.user is set by JwtStrategy
    const user = (req as any).user;
    const sender_name = user?.fullname || user?.name || user?.email || 'Unknown';
    return this.documentService.handleUpload(file, { ...body, sender_name });
  }

  @UseGuards(require('../auth/jwt-auth.guard').JwtAuthGuard)
  @Get()
  async getAllDocuments(@Req() req: Request) {
    // Optionally, filter by user: req.user
    return this.documentService.getAllDocuments();
  }
}
