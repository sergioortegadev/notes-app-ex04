import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { Request, Response } from 'express';

@Controller('v1/notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Get()
  getNotes(@Query() query, @Req() request: Request, @Res() response: Response) {
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
  postNotes(
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

  @Put(':id')
  putNotes(
    @Param('id') id: number,
    @Req() request: Request,
    @Res() response: Response,
    @Body('isCompleted') isCompleted?: boolean,
    @Body('title') title?: string,
    @Body('description') description?: string,
    @Body('category') category?: string,
  ) {
    (async () => {
      const data = await this.notesService.putNotes(
        id,
        isCompleted,
        title,
        description,
        category,
      );

      if (data.data) response.status(201).json(data);
      else response.status(207).json(data);
    })();
  }

  @Delete(':id')
  deleteNotes(
    @Param('id') id: number,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    (async () => {
      const data = await this.notesService.deleteNotes(id);

      if (data.data) response.status(200).json(data);
      else response.status(207).json(data);
    })();
  }
}
