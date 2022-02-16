import { NotFoundException } from '@nestjs/common';
import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver, Subscription } from '@nestjs/graphql';
import { Class } from 'src/api/class/entities/class.entity';
import { Kid } from '../entities/kid.entity';
import { KidService } from '../services/kid.service';

@Resolver((of) => Kid)
export class KidResolver {
  constructor(private kidService: KidService) {}

  @Query((returns) => Kid)
  async getKidById(@Args('id', { type: () => Int }) id: number) {
    console.log('id', id);

    let kid = await this.kidService.getKidById(id);
    console.log(kid);

    return kid;
  }

  @ResolveField((returns) => Class)
  class(@Parent() kid: Kid) {
    console.log('----------------');
    console.log(kid);

    return {
      id: 3,
      name: 'Kindergarssssten',
      thumbnail: null,
      status: null,
      min_age: 5,
      max_age: 5,
      description: null,
    };
  }

  // @Mutation((returns) => Class)
  // async createClass(@Args('createClassReqDto') createClassReqDto: CreateClassReqDto): Promise<Class> {
  //   const newClass = await this.classService.createClass(createClassReqDto);
  //   return newClass;
  // }

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
