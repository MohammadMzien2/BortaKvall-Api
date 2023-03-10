/**
 * Router Template
 */
import express from "express"
import { body } from 'express-validator'
import { index, show, store } from '../controllers/order_controller'
const router = express.Router()

/**
 * Get /order
 */
router.get('/', index)

/**
 * Get /order/: orderId
 */
router.get('/:oderId', show)

/**
 * Post /order and the validation
 */
router.post('/', [
	body('customer_first_name').isString().withMessage('has to be a string'),
	body('customer_last_name').isString().withMessage('has to be a string'),
	body('customer_address').isString().withMessage('has to be a string'),
	body('customer_postcode').isString().isLength({ max: 6 }).withMessage('has to be a string and cant be longer than 6 chars'),
	body('customer_city').isString().withMessage('has to be a string'),
	body('customer_email').isString().isEmail().withMessage('has to be a string'),
	body('customer_phone').isString().isLength({ max: 20 }).withMessage('has to be a string'),
	body('order_total').isInt().withMessage('has to be a number'),
	body('order_items.*.product_id').isInt({ min: 1 }).bail().withMessage('has to be a number and at least 1 '),
	body('order_items.*.qty').isInt({ min: 1 }).bail().withMessage('has to be a number and not 0'),
	body('order_items.*.item_price').isInt({ min: 1 }).bail().withMessage('has to be a number and not 0'),
	body('order_items.*.item_total').isInt({ min: 1 }).bail().withMessage('has to be a number and not 0'),
], store)







/**
 * PATCH/ order/: orderId
 * router.patch('/:orderId', [], update)
 */

/**
 * DELETE /order/:orderId
 * router.delete('/:orderId', destroy)
 *
 */

export default router
