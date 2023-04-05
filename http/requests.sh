#!/bin/zsh

userCreated=$(http POST http://localhost:3000/users email="teste@gmail.com" password="123456" \
  username="teste12" passwordConfirmation="123456")

echo "user created: $userCreated"

productCreated=$(http -f POST http://localhost:3000/products name="pacote de doação" description="descrição do pacote" \
  price=2 donation=1000 hasDiscount=false isActivated=true thumbnail@~/Printscreens/app.png)

productId=$(echo $productCreated | jq -r '.id')

echo "product created: $productCreated"

productDeleted=$(http DELETE http://localhost:3000/products/$productId)

echo "product deleted: $productDeleted"

postCreated=$(http -f POST http://localhost:3000/posts title="teste" content="teste" category="news" \
  excerpt="teste" published=true thumbnail@~/Printscreens/app.png tags="tag1" tags="tag2")

echo "post created: $postCreated"

postsGetted=$(http GET http://localhost:3000/posts limit==5 page==1 category=="news")

echo "posts getted: $postsGetted"

postId=$(echo $postsGetted | jq -r '.[0].id')

echo "post id: $postId"

postUpdated=$(http -f PUT http://localhost:3000/posts/$postId title="teste" content="teste" category="news" \
  published=true tags="tagteste" tags="tagoutra")

echo "post updated: $postUpdated"
