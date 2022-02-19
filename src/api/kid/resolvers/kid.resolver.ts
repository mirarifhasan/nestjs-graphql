import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver, Subscription } from '@nestjs/graphql';
import { Class } from 'src/api/class/entities/class.entity';
import { ClassService } from 'src/api/class/services/class.service';
import { MyFristGuard } from 'src/common/guards/my-first.guard';
import { Kid } from '../entities/kid.entity';
import { KidService } from '../services/kid.service';

@Resolver((of) => Kid)
export class KidResolver {
  constructor(private kidService: KidService, private classService: ClassService) {}

  @Query((returns) => Kid)
  @UseGuards(MyFristGuard)
  async getKidById(@Args('id', { type: () => Int }) id: number) {
    let kid = await this.kidService.getKidById(id);
    return kid;
  }

  @ResolveField((returns) => Class)
  class(@Parent() kid: Kid) {
    console.log('ResolverField Called');
    return this.classService.getClassById(kid.class_id);
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
