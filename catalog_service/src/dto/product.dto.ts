import { IsNotEmpty, isNumber, IsNumber, IsString, Min } from "class-validator";

export class CreateProductRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @Min(1)
  price: number;

  @IsNumber()
  @Min(0)
  stock: number;
}

export class UpdateProductRequest {
  name?: string;
  description?: string;

  @Min(1)
  price?: number;

  @Min(0)
  stock?: number;
}
