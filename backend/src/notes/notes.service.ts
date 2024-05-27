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
}
