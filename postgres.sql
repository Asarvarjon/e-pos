 
CREATE TABLE products (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    rating DECIMAL(3, 1),
    on_sale BOOLEAN
);

 
INSERT INTO products (product_id, product_name, rating, on_sale)
VALUES 
    (1, 'Product A', 4.5, true),
    (2, 'Product B', 3.8, false),
    (3, 'Product C', 4.2, true);

 
CREATE TABLE sold_products (
    user_id INT,
    product_id INT,
    quantity INT,
    purchase_date TIMESTAMP,
    PRIMARY KEY (user_id, product_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

 
INSERT INTO sold_products (user_id, product_id, quantity, purchase_date)
VALUES
    (101, 1, 2, '2024-02-14 08:30:00'),
    (102, 2, 1, '2024-02-14 09:45:00'),
    (103, 1, 3, '2024-02-14 11:15:00');



// QUERY

SELECT
    product_id,
    product_name,
    rating,
    on_sale
FROM (
    SELECT
        p.product_id,
        p.product_name,
        p.rating,
        p.on_sale,
        ROW_NUMBER() OVER (ORDER BY p.rating DESC) AS rating_rank,
        COALESCE(SUM(sp.quantity), 0) AS total_sold
    FROM
        products p
    LEFT JOIN
        sold_products sp ON p.product_id = sp.product_id
    WHERE
        p.on_sale = true
    GROUP BY
        p.product_id, p.product_name, p.rating, p.on_sale
) AS RankedProducts
WHERE
    rating_rank = 1
ORDER BY
    total_sold DESC;
