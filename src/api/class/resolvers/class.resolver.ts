import { CreateClassReqDto } from './../dtos/request/create-class-req.dto';
import { NotFoundException } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { Class } from '../entities/class.entity';
import { ClassService } from '../services/class.service';

@Resolver((of) => Class)
export class ClassResolver {
  constructor(private classService: ClassService) {}

  @Query((returns) => [Class])
  async getAllClass() {
    const allClass = await this.classService.getAllClass();
    return allClass;
  }

  @Query((returns) => Class)
  async getClassById(@Args('id', { type: () => Int }) id: number) {
    console.log('id', id);

    const aClass = await this.classService.getClassById(id);
    return aClass;
  }

  @Mutation((returns) => Class)
  async createClass(@Args('createClassReqDto') createClassReqDto: CreateClassReqDto): Promise<Class> {
    const newClass = await this.classService.createClass(createClassReqDto);
    return newClass;
  }

  /*
  @Query(returns => [Recipe])
  recipes(@Args() recipesArgs: RecipesArgs): Promise<Recipe[]> {
    return this.recipesService.findAll(recipesArgs);
  }

  @Mutation(returns => Recipe)
  async addRecipe(
    @Args('newRecipeData') newRecipeData: NewRecipeInput,
  ): Promise<Recipe> {
    const recipe = await this.recipesService.create(newRecipeData);
    pubSub.publish('recipeAdded', { recipeAdded: recipe });
    return recipe;
  }

  @Mutation(returns => Boolean)
  async removeRecipe(@Args('id') id: string) {
    return this.recipesService.remove(id);
  }*/
}
