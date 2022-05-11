import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UploadsService } from './uploads.service';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { IsPublicRoute } from 'src/auth/decorators/is-public-route.decorator';

@Resolver()
export class UploadsResolver {
  constructor(private readonly UploadService: UploadsService) {}

  @Mutation(() => String)
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload })
    fileInput: FileUpload,
  ): Promise<string> {
    return await this.UploadService.upload(fileInput);
  }
}
