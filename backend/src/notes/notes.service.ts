import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notes } from './notes.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Notes) private notesRepository: Repository<Notes>,
  ) {}

  async getNotes(query?: object) {
    let data: Array<object> = [];

    if (query) {
      const searchQuery = Object.keys(query)[0];

      if (searchQuery.trim().length < 3) {
        return {
          message: 'You must enter at least 3 characters in the search.',
        };
      }

      switch (searchQuery) {
        case 'title':
          data = await this.notesRepository.find({
            where: { title: Like(`%${Object.values(query)[0]}%`) },
          });
          break;

        case 'description':
          data = await this.notesRepository.find({
            where: { description: Like(`%${Object.values(query)[0]}%`) },
          });
          break;

        case 'category':
          data = await this.notesRepository.find({
            where: { category: Object.values(query)[0] },
          });
          break;

        case 'isCompleted':
          if (Object.values(query)[0] === 'true') {
            data = await this.notesRepository.find({
              where: { isCompleted: true },
            });
          } else {
            data = await this.notesRepository.find({
              where: { isCompleted: false },
            });
          }
          break;

        default:
          return {
            message: `${data.length}` + ' Note/s obtained correctly from DB.',
            data: data,
          };
      }
    } else {
      data = await this.notesRepository.find();
    }

    if (data.length === 0) return { message: 'No notes found in DB.' };

    return {
      message: `Data obtained ok from DB. Listing ${data.length} notes.`,
      data: data,
    };
  }

  async postNotes(title: string, description: string, category: string) {
    const note = new Notes();
    note.title = title;
    note.description = description;
    note.category = category;

    if (
      title === undefined ||
      description === undefined ||
      category === undefined
    )
      return {
        message: 'Error: missing title, description, or category.',
      };

    return {
      message: `Note with title: '${note.title}' entered ok into DB`,
      data: await this.notesRepository.save(note),
    };
  }

  async putNotes(
    id: number,
    isCompleted?: boolean,
    title?: string,
    description?: string,
    category?: string,
  ) {
    const note = await this.notesRepository.findOne({ where: { id: id } });

    if (note) {
      if (isCompleted !== undefined) {
        note.isCompleted = isCompleted;
      }
      if (title !== undefined) {
        note.title = title;
      }
      if (description !== undefined) {
        note.description = description;
      }
      if (category !== undefined) {
        note.category = category;
      }
      return {
        message: `Note with id: ${note.id} and title: '${note.title}' updated ok into DB`,
        data: await this.notesRepository.save(note),
      };
    } else {
      return {
        message: `Error - id: ${id} not found in DB`,
      };
    }
  }

  async deleteNotes(id: number) {
    const note = await this.notesRepository.findOne({ where: { id: id } });

    if (note) {
      await this.notesRepository.delete(id);

      return {
        message: `Note with id: ${note.id} and title: '${note.title}' deleted ok into DB`,
        data: (await this.notesRepository.find()).filter(
          (note) => note.id !== id,
        ),
      };
    } else {
      return {
        message: `Error - id: ${id} not found in DB`,
      };
    }
  }
}
