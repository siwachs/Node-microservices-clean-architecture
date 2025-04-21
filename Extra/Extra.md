# Add system Boundries between Microservices

We need to apply physical and logical boundries for this Apply DDD (Domain Driven Design)

Domain is a Business it can be E-Commerce, Finance (Banking), Shipping etc.
Ex: Iphone -> It can have a Domain Expert (its a electonic_product), Developer (product), Project Manager (electronic_item)
And all of them need to work together

DDD is finding one and only language that all of them could communicate with each other

```
      ------------------
phone ------------------
      ------------------
```

```
E-Commerce ----------------- product/catalog (Get info about product) ------- categories
                                                                      ------- price
           ----------------- customer -------------- profile
                                      -------------- cart
                                      -------------- orders
           ----------------- payment  -------------- transactions
                                      -------------- orders
           ----------------- inventorty ------------- stock
                                        ------------- sellers

```

# Context, Boundries Or Bounded Context

```
User Context -------------------- Events -------------- Order Context
Catalog Context
Order Context ------------------- Events -------------- Payment Context
Payment Context
```

The differenct context can have same model but different meaning. Ex: Catalog Context hav product and Order Context have product but both have different properties. We only use relevent properties for particular context.
ie a Domain can have multiple modles (For Business logic)
