const pg = require("pg");

let auth_connection = new pg.Pool({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: "epic_database",
});
auth_connection.connect(function (err) {
  if (!err) {
    console.log("Database is connected ... nn");
    CreateTablesIfNeeded();
  } else {
    console.log(err, "Error connecting database ... nn");
  }
});

async function CreateTablesIfNeeded() {
  console.log("Creating tables if needed ... nn");
  // Products table
  await auth_connection
    .query(
      `CREATE TABLE IF NOT EXISTS public.products
        (
            id SERIAL NOT NULL,
            title character varying(255) NOT NULL,
            price double precision NOT NULL,
            description text,
            specs jsonb,
            in_stock integer NOT NULL DEFAULT 0,
            added timestamp with time zone NOT NULL DEFAULT now(),
            color character varying(100),
            images json,
            brand character varying(100),
            CONSTRAINT products_pkey PRIMARY KEY (id)
        )
        
        TABLESPACE pg_default;`
    )
    .then((res) => {
      console.log("Products table created");
    });

  // Product categories table (stores what categories exist)

  await auth_connection
    .query(
      `CREATE TABLE IF NOT EXISTS public.product_categories
    (
        id SERIAL NOT NULL,
        parent_id integer,
        category_name character varying(255) NOT NULL,
        CONSTRAINT product_categories_pkey PRIMARY KEY (id),
        CONSTRAINT uq_cat UNIQUE (parent_id, category_name),
        CONSTRAINT fk_id FOREIGN KEY (parent_id)
            REFERENCES public.product_categories (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE CASCADE
            NOT VALID
    )
    
    TABLESPACE pg_default;`
    )
    .then((res) => {
      console.log("Product categories table created");
    });

  // Product variations table
  await auth_connection
    .query(
      `CREATE TABLE IF NOT EXISTS public.variations
        (
            id SERIAL NOT NULL,
            product_id integer NOT NULL,
            variation_id integer NOT NULL,
            variation_image character varying(255),
            CONSTRAINT variations_pkey PRIMARY KEY (id),
            CONSTRAINT fk_product_id FOREIGN KEY (product_id)
                REFERENCES public.products (id) MATCH SIMPLE
                ON UPDATE NO ACTION
                ON DELETE NO ACTION,
            CONSTRAINT fk_variation_id FOREIGN KEY (variation_id)
                REFERENCES public.products (id) MATCH SIMPLE
                ON UPDATE NO ACTION
                ON DELETE NO ACTION
        )
        
        TABLESPACE pg_default;`
    )
    .then((res) => {
      console.log("Variations table created");
    });

  // Users table
  await auth_connection
    .query(
      `CREATE TABLE IF NOT EXISTS public.users
        (
            id SERIAL NOT NULL,
            email character varying(255) NOT NULL,
            hashed_password character varying(255) NOT NULL,
            first_name character varying(100) NOT NULL,
            last_name character varying(100) NOT NULL,
            is_admin boolean NOT NULL DEFAULT 'false',
            CONSTRAINT users_pkey PRIMARY KEY (id),
            CONSTRAINT users_email_key UNIQUE (email)
        )
        
        TABLESPACE pg_default;`
    )
    .then((res) => {
      console.log("Users table created");
    });

  // Categories table (it stores what products have what categories)
  await auth_connection
    .query(
      `CREATE TABLE IF NOT EXISTS public.categories
        (
            id SERIAL NOT NULL,
            category_id integer NOT NULL,
            product_id integer NOT NULL,
            CONSTRAINT categories_pkey PRIMARY KEY (id),
            CONSTRAINT uq_product_cat UNIQUE (category_id, product_id),
            CONSTRAINT fk_category FOREIGN KEY (category_id)
                REFERENCES public.product_categories (id) MATCH SIMPLE
                ON UPDATE NO ACTION
                ON DELETE CASCADE,
            CONSTRAINT fk_product_id FOREIGN KEY (product_id)
                REFERENCES public.products (id) MATCH SIMPLE
                ON UPDATE NO ACTION
                ON DELETE CASCADE
        )
        
        TABLESPACE pg_default;`
    )
    .then((res) => {
      console.log("Categories table created");
    });

  // Basket table
  await auth_connection
    .query(
      `CREATE TABLE IF NOT EXISTS public.basket
        (
            id SERIAL NOT NULL,
            user_id integer NOT NULL,
            product_id integer NOT NULL,
            added timestamp with time zone NOT NULL DEFAULT 'now()',
            quantity integer NOT NULL DEFAULT 1,
            CONSTRAINT basket_pkey PRIMARY KEY (id),
            CONSTRAINT fk_product_user UNIQUE (user_id, product_id),
            CONSTRAINT fk_product_id FOREIGN KEY (product_id)
                REFERENCES public.products (id) MATCH SIMPLE
                ON UPDATE NO ACTION
                ON DELETE NO ACTION,
            CONSTRAINT user_id_fkey FOREIGN KEY (user_id)
                REFERENCES public.users (id) MATCH SIMPLE
                ON UPDATE NO ACTION
                ON DELETE CASCADE
        )
        
        TABLESPACE pg_default;`
    )
    .then((res) => {
      console.log("Basket table created");
    });

  // Orders table
  await auth_connection
    .query(
      `CREATE TABLE IF NOT EXISTS public.orders
        (
            id SERIAL NOT NULL,
            added timestamp with time zone NOT NULL DEFAULT 'now()',
            postal_code integer NOT NULL,
            quantity integer NOT NULL DEFAULT 1,
            email character varying(255) NOT NULL,
            price_at_payment double precision NOT NULL,
            user_id integer,
            first_name character varying(255) NOT NULL,
            last_name character varying(255) NOT NULL,
            street_name character varying(255) NOT NULL,
            house_number character varying(255) NOT NULL,
            city character varying(255) NOT NULL,
            product_id integer,
            country character varying(255) NOT NULL,
            CONSTRAINT orders_pkey PRIMARY KEY (id),
            CONSTRAINT fk_product_id FOREIGN KEY (product_id)
                REFERENCES public.products (id) MATCH SIMPLE
                ON UPDATE NO ACTION
                ON DELETE SET NULL
        )
        
        TABLESPACE pg_default;`
    )
    .then((res) => {
      console.log("Orders table created");
    });

  // Comments table
  await auth_connection
    .query(
      `CREATE TABLE IF NOT EXISTS public.comments
        (
            id SERIAL NOT NULL,
            user_id integer NOT NULL,
            comment character varying(500) NOT NULL,
            product_id integer NOT NULL,
            parent_comment integer,
            created_at timestamp with time zone NOT NULL DEFAULT 'now()',
            CONSTRAINT comments_pkey PRIMARY KEY (id),
            CONSTRAINT comments_parent_comment_fkey FOREIGN KEY (parent_comment)
                REFERENCES public.comments (id) MATCH SIMPLE
                ON UPDATE NO ACTION
                ON DELETE CASCADE,
            CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id)
                REFERENCES public.users (id) MATCH SIMPLE
                ON UPDATE NO ACTION
                ON DELETE SET NULL,
            CONSTRAINT fk_product_id FOREIGN KEY (product_id)
                REFERENCES public.products (id) MATCH SIMPLE
                ON UPDATE NO ACTION
                ON DELETE NO ACTION
        )
        
        TABLESPACE pg_default;`
    )
    .then((res) => {
      console.log("Comments table created");
    });

  // Ratings table
  await auth_connection
    .query(
      `CREATE TABLE IF NOT EXISTS public.grades
        (
            id SERIAL NOT NULL,
            grade integer,
            user_id integer,
            product_id integer,
            CONSTRAINT grades_pkey PRIMARY KEY (id),
            CONSTRAINT fk_product_id FOREIGN KEY (product_id)
                REFERENCES public.products (id) MATCH SIMPLE
                ON UPDATE NO ACTION
                ON DELETE CASCADE,
            CONSTRAINT grades_user_id_fkey FOREIGN KEY (user_id)
                REFERENCES public.users (id) MATCH SIMPLE
                ON UPDATE NO ACTION
                ON DELETE CASCADE,
            CONSTRAINT grades_grade_check CHECK (grade > 0 AND grade < 6)
        )
        
        TABLESPACE pg_default;`
    )
    .then((res) => {
      console.log("Grades table created");
    });

  console.log("All tables checked and created if needed");
}

module.exports = auth_connection;
