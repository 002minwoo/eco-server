import express from "express"
import tourController from "./tour.controller";


export const tourRouter = express.Router();

tourRouter.post("/", tourController.addTour)
tourRouter.put("/", tourController.updateTour)
tourRouter.get("/s/t", tourController.getListSuggestTour)
tourRouter.get("/", tourController.getListTour)
tourRouter.get("/c", tourController.getListTourCategory)
tourRouter.get("/d", tourController.getTourDetail)
tourRouter.delete("/", tourController.deleteTour)