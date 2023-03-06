import Debug from "debug";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import prisma from "../prisma";


//Create a new debug instance
const debug = Debug('prisma-boilerplate:I_AM_LAZY_AND_HAVE_NOT_CHANGED_THIS_😛')


/**
 * Get all orders
 */
export const index = async (req: Request, res: Response) => {
	try {
		const orders = await prisma.order.findMany({
		})
		res.send({
			status: "success",
			data: orders
		})
	}catch (err) {
		debug("Error thrown when finding orders o%", err)
		res.status(500).send({ status: "error", message: "something went wrong"})
	}
}

/**
 * Get a single order
 */

export const show = async(req: Request, res: Response) => {
	const { oderId } = req.params
	try{
		const order = await prisma.order.findUniqueOrThrow({
			where: {
				id: Number(oderId)
			}, include: {
				order_items: true,
			}
		})
		res.send({
			status: "success",
			data:order,
		})
	}catch(err){
		debug("Thrown error something is wrong o%", req.params, err)
		res.status(500).send({status: "error", message: "something is wrong"})
	}
}


/**
 * Create a order
 */

export const store = async (req: Request, res: Response) => {
	const validationErros = validationResult(req)
	if(!validationErros.isEmpty()){
		return res.status(400).send({
			status: "fail",
			data: validationErros.array(),
		})
	}
	try{
		const{ order_items, customer_first_name, customer_last_name, customer_address, customer_postcode, customer_city, customer_email, customer_phone, order_total } = req.body
		const order = await prisma.order.create({
			data: {
				customer_first_name,
				customer_last_name,
				customer_address,
				customer_postcode,
				customer_city,
				customer_email,
				customer_phone,
				order_total,
				order_items: {
					create: order_items
				},
			},
			include: {
				order_items: true,
			}
		})
		res.send({
			status: "success",
			data: order,
		})
	}catch(err){
		debug("Error thrown when creating a order o% o%", err)
		res.status(500).send({status: "error", message: "something went wrong"})
	}
}
