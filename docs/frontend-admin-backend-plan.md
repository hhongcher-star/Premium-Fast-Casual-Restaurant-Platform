# Maison Olive Frontend, Admin, and Backend Plan

## Goal

Build one restaurant ordering system with three cooperating parts:

- Customer frontend: browsing menu, choosing item options, cart, checkout, reservations, rewards, profile, and order tracking.
- Admin portal: managing menu, prices, stock, orders, reservations, rewards, customers, promotions, and reports.
- Backend API: shared source of truth for data, business rules, authentication, payment/order workflows, and operational events.

## Customer Frontend

The frontend should focus on fast ordering and reservation flows.

Core pages:

- Home: brand story, featured dishes, menu CTA, reservation CTA.
- Menu: searchable and filterable menu list.
- Menu detail: item image, description, rating, preparation time, calories, quantity, and option selection. Only burger and pizza expose size selection.
- Cart: item quantities, selected size labels, promo code, totals, delivery fee, and checkout CTA.
- Checkout: customer details, fulfillment method, delivery address or pickup time, payment summary, and order placement.
- Reserve: date, time, party size, contact details, special request, and confirmation.
- Rewards: points balance, earn rules, redeemable rewards, and member perks.
- Profile: saved customer details, recent orders, preferences, and saved addresses.
- Track order: order status timeline and estimated delivery or pickup time.

Frontend responsibilities:

- Render SEO metadata for public pages.
- Keep private pages such as cart, checkout, profile, and tracking set to noindex.
- Validate user inputs before API submission.
- Preserve selected item options in cart state.
- Avoid showing unavailable options returned by backend.
- Keep mobile layouts usable, especially menu, cart, checkout, and reservation flows.
- Lazy load below-the-fold images and avoid unnecessary direct add-to-cart controls when options are required.

## Admin Portal

The admin portal should give restaurant staff operational control without changing code.

Required modules:

- Dashboard: today orders, reservations, revenue, average prep time, and low-stock alerts.
- Menu manager: create, edit, hide, delete, and reorder menu items.
- Option manager: configure item options such as burger and pizza sizes, option prices, and availability.
- Category manager: manage categories, tags, dietary labels, calories, prep time, and image assets.
- Order manager: view incoming orders, accept or reject, update preparation status, mark ready, mark delivered, refund or cancel.
- Reservation manager: view bookings, confirm, seat, cancel, and block unavailable time slots.
- Promotion manager: create promo codes, discount rules, start/end dates, minimum spend, and usage limits.
- Rewards manager: configure earning rules, redemption rewards, point expiry, and member tiers.
- Customer manager: view customer profiles, order history, reward points, and support notes.
- Reports: sales by item, sales by category, peak order times, reservation trends, promo usage, and customer retention.

Admin responsibilities:

- Require authenticated staff accounts and role-based permissions.
- Never trust frontend price data; admin changes must be saved through backend APIs.
- Upload and validate optimized images.
- Support draft and published states for menu items.
- Record audit logs for price, menu, order, refund, and permission changes.

## Backend API

The backend owns all persisted business data and rules.

Core domains:

- Auth: customer login, staff login, sessions, password reset, and roles.
- Menu: categories, dishes, tags, options, prices, images, availability, and publish state.
- Cart pricing: authoritative calculation for item price, selected options, discounts, tax, delivery, and totals.
- Orders: create order, payment status, kitchen status, delivery or pickup status, cancellation, refund, and order history.
- Reservations: availability, booking creation, modification, cancellation, table assignment, and staff notes.
- Rewards: points earning, redemption, expiry, tier logic, and transaction history.
- Promotions: promo validation, eligibility, usage count, and discount calculation.
- Notifications: order confirmation, reservation confirmation, status changes, and password reset.
- Analytics: daily metrics, item sales, revenue, reservation utilization, and operational reports.

Backend responsibilities:

- Validate every request, including item IDs, selected size, quantity, promo code, and reservation availability.
- Calculate all prices server-side.
- Keep menu option rules centralized so frontend and admin behave consistently.
- Expose stable API responses with clear error codes.
- Enforce authorization for customer-only and staff-only data.
- Store order and reservation status transitions safely.
- Provide paginated endpoints for admin tables.
- Return image URLs and dimensions when available for frontend performance.

## API Boundary

Customer frontend should consume:

- `GET /menu`
- `GET /menu/:id`
- `POST /cart/quote`
- `POST /orders`
- `GET /orders/:id`
- `POST /reservations`
- `GET /rewards/me`
- `GET /profile/me`
- `PATCH /profile/me`

Admin portal should consume:

- `GET /admin/dashboard`
- `GET /admin/menu`
- `POST /admin/menu`
- `PATCH /admin/menu/:id`
- `PATCH /admin/menu/:id/options`
- `GET /admin/orders`
- `PATCH /admin/orders/:id/status`
- `GET /admin/reservations`
- `PATCH /admin/reservations/:id`
- `GET /admin/customers`
- `GET /admin/reports/sales`
- `GET /admin/audit-logs`

Shared contracts:

- Menu item IDs must be stable.
- Option names and prices come from backend.
- Cart line identity should include item ID plus selected options.
- Backend returns final totals; frontend only displays them.
- Admin price changes should not mutate already placed orders.

## Delivery Order

1. Backend menu, option, cart quote, and order APIs.
2. Customer frontend menu detail, cart, checkout, and tracking integration.
3. Admin menu and order management.
4. Reservation backend and customer reservation page integration.
5. Admin reservation management.
6. Rewards backend, frontend rewards page, and admin rewards rules.
7. Reports, audit logs, and operational dashboards.

## SEO and Performance Checklist

- Public pages have unique title, description, canonical, Open Graph, and Twitter metadata.
- Cart, checkout, profile, and tracking pages use `noindex`.
- Images below the fold use lazy loading and async decoding.
- Primary detail images load eagerly.
- Menu list cards avoid hidden add-to-cart controls when item options may be required.
- Use stable item option data instead of hardcoded UI-only prices.
- Keep mobile grids readable, with no overlapping text or controls.
