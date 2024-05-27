import { Body, Controller, Get, Post, Query, Req, Res } from '@nestjs/common';
import { NotesService } from './notes.service';
import { Request, Response } from 'express';

@Controller('v1/notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Get()
  async getNotes(
    @Query() query,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    let data;

    (async () => {
      if (query.title !== undefined) {
        data = await this.notesService.getNotes(query);
      }
      if (query.description !== undefined) {
        data = await this.notesService.getNotes(query);
      }
      if (query.category !== undefined) {
        data = await this.notesService.getNotes(query);
      }
      if (query.isCompleted !== undefined) {
        data = await this.notesService.getNotes(query);
      }

      if (data) {
        if (data.message === 'No notes found in DB.') {
          response.status(207).json(data);
        } else {
          response.status(200).json(data);
        }
        return data;
      }
      data = await this.notesService.getNotes();
      response.status(200).json(data);
      return data;
    })();
  }

  @Post()
  async postNotes(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('category') category: string,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    (async () => {
      const data = await this.notesService.postNotes(
        title,
        description,
        category,
      );
      if (data.data) {
        response.status(201).json(data);
      } else {
        response.status(207).json(data);
      }
    })();
  }
}
