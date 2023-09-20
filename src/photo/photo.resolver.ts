import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { PhotoService } from "./photo.service";
import { Photo } from "./photo";
import { CreatePhotoInput } from "./create-photo.input";
import { UpdatePhotoInput } from "./update-photo.input";

@Resolver(() => Photo)
export class PhotoResolver {
  constructor(private readonly photoService: PhotoService) {}

  @Mutation(() => Photo)
  createPhoto(@Args("args") args: CreatePhotoInput) {
    return this.photoService.create(args);
  }

  @Query(() => [Photo], { name: "photo" })
  findAll() {
    return this.photoService.findAll();
  }

  @Query(() => Photo, { name: "photo" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.photoService.findOne(id);
  }

  @Mutation(() => Photo)
  updatePhoto(@Args("updatePhotoInput") updatePhotoInput: UpdatePhotoInput) {
    return this.photoService.update(updatePhotoInput.id, updatePhotoInput);
  }

  @Mutation(() => Photo)
  removePhoto(@Args("id", { type: () => Int }) id: number) {
    return this.photoService.remove(id);
  }
}
