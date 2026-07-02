import { onRequestPost as __api_inventory_recipes_ts_onRequestPost } from "/Users/richardreinhard/Documents/Licit Cocktails Materials/Hedonic-Cocktails-Website/functions/api/inventory/recipes.ts"
import { onRequestPost as __api_inventory_verify_ts_onRequestPost } from "/Users/richardreinhard/Documents/Licit Cocktails Materials/Hedonic-Cocktails-Website/functions/api/inventory/verify.ts"
import { onRequestPatch as __api_inventory__id__ts_onRequestPatch } from "/Users/richardreinhard/Documents/Licit Cocktails Materials/Hedonic-Cocktails-Website/functions/api/inventory/[id].ts"
import { onRequestGet as __api_inventory_index_ts_onRequestGet } from "/Users/richardreinhard/Documents/Licit Cocktails Materials/Hedonic-Cocktails-Website/functions/api/inventory/index.ts"
import { onRequestPost as __api_inventory_index_ts_onRequestPost } from "/Users/richardreinhard/Documents/Licit Cocktails Materials/Hedonic-Cocktails-Website/functions/api/inventory/index.ts"
import { onRequestGet as __api_products_ts_onRequestGet } from "/Users/richardreinhard/Documents/Licit Cocktails Materials/Hedonic-Cocktails-Website/functions/api/products.ts"

export const routes = [
    {
      routePath: "/api/inventory/recipes",
      mountPath: "/api/inventory",
      method: "POST",
      middlewares: [],
      modules: [__api_inventory_recipes_ts_onRequestPost],
    },
  {
      routePath: "/api/inventory/verify",
      mountPath: "/api/inventory",
      method: "POST",
      middlewares: [],
      modules: [__api_inventory_verify_ts_onRequestPost],
    },
  {
      routePath: "/api/inventory/:id",
      mountPath: "/api/inventory",
      method: "PATCH",
      middlewares: [],
      modules: [__api_inventory__id__ts_onRequestPatch],
    },
  {
      routePath: "/api/inventory",
      mountPath: "/api/inventory",
      method: "GET",
      middlewares: [],
      modules: [__api_inventory_index_ts_onRequestGet],
    },
  {
      routePath: "/api/inventory",
      mountPath: "/api/inventory",
      method: "POST",
      middlewares: [],
      modules: [__api_inventory_index_ts_onRequestPost],
    },
  {
      routePath: "/api/products",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_products_ts_onRequestGet],
    },
  ]