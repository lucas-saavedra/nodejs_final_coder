export const swaggerDocument = {
    "swagger": "2.0",
    "info": {
        "version": "1.0",
        "title": "E-commerce Api",
        "description": "Proyecto para Coderhouse"
    },
    "host": "localhost:8080",
    "basePath": "/",
    "schemes": [
        "http"
    ],
    "paths": {
        "/auth/login": {
            "post": {
                "tags": [],
                "summary": "POST /auth/login",
                "description": "POST /auth/login",
                "operationId": "POST/auth/login",
                "consumes": [],
                "parameters": [
                    {
                        "name": "Login",
                        "in": "body",
                        "description": "request body",
                        "x-ms-summary": "request body",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "email": {
                                    "type": "string",
                                    "description": "email",
                                    "x-ms-summary": "email"
                                },
                                "password": {
                                    "type": "string",
                                    "description": "password",
                                    "x-ms-summary": "password"
                                }
                            }
                        }
                    }
                ],
                "produces": [
                    "application/json; charset=utf-8"
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "success": {
                                    "type": "boolean",
                                    "description": "success",
                                    "x-ms-summary": "success"
                                },
                                "result": {
                                    "type": "array",
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "_id": {
                                                "type": "string",
                                                "description": "_id",
                                                "x-ms-summary": "_id"
                                            },
                                            "name": {
                                                "type": "string",
                                                "description": "name",
                                                "x-ms-summary": "name"
                                            },
                                            "details": {
                                                "type": "string",
                                                "description": "details",
                                                "x-ms-summary": "details"
                                            },
                                            "url": {
                                                "type": "string",
                                                "description": "url",
                                                "x-ms-summary": "url"
                                            },
                                            "code": {
                                                "type": "string",
                                                "description": "code",
                                                "x-ms-summary": "code"
                                            },
                                            "category": {
                                                "type": "string",
                                                "description": "category",
                                                "x-ms-summary": "category"
                                            },
                                            "price": {
                                                "type": "integer",
                                                "description": "price",
                                                "x-ms-summary": "price"
                                            },
                                            "stock": {
                                                "type": "integer",
                                                "description": "stock",
                                                "x-ms-summary": "stock"
                                            },
                                            "createdAt": {
                                                "type": "string",
                                                "description": "createdAt",
                                                "x-ms-summary": "createdAt"
                                            },
                                            "updatedAt": {
                                                "type": "string",
                                                "description": "updatedAt",
                                                "x-ms-summary": "updatedAt"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "deprecated": false,
                "x-ms-visibility": "important"
            }
        },
        "/auth/register": {
            "post": {
                "tags": [],
                "summary": "POST /auth/register",
                "description": "POST /auth/register",
                "operationId": "POST/auth/register",
                "consumes": [],
                "parameters": [
                    {
                        "name": "__requested_body__",
                        "in": "body",
                        "description": "request body",
                        "x-ms-summary": "request body",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "name": {
                                    "type": "string",
                                    "description": "name",
                                    "x-ms-summary": "name"
                                },
                                "email": {
                                    "type": "string",
                                    "description": "email",
                                    "x-ms-summary": "email"
                                },
                                "password": {
                                    "type": "string",
                                    "description": "password",
                                    "x-ms-summary": "password"
                                },
                                "adress": {
                                    "type": "string",
                                    "description": "adress",
                                    "x-ms-summary": "adress"
                                },
                                "phone": {
                                    "type": "string",
                                    "description": "phone",
                                    "x-ms-summary": "phone"
                                }
                            }
                        }
                    }
                ],
                "produces": [],
                "responses": {
                    "0": {
                        "description": "",
                        "schema": {}
                    }
                },
                "deprecated": false,
                "x-ms-visibility": "important"
            }
        },
        "/auth/profile": {
            "get": {
                "tags": [],
                "summary": "GET /auth/profile",
                "description": "GET /auth/profile",
                "operationId": "GET/auth/profile",
                "consumes": [],
                "parameters": [],
                "produces": [
                    "application/json; charset=utf-8"
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "_id": {
                                    "type": "string",
                                    "description": "_id",
                                    "x-ms-summary": "_id"
                                },
                                "email": {
                                    "type": "string",
                                    "description": "email",
                                    "x-ms-summary": "email"
                                },
                                "name": {
                                    "type": "string",
                                    "description": "name",
                                    "x-ms-summary": "name"
                                },
                                "adress": {
                                    "type": "string",
                                    "description": "adress",
                                    "x-ms-summary": "adress"
                                },
                                "phone": {
                                    "type": "string",
                                    "description": "phone",
                                    "x-ms-summary": "phone"
                                },
                                "createdAt": {
                                    "type": "string",
                                    "description": "createdAt",
                                    "x-ms-summary": "createdAt"
                                },
                                "updatedAt": {
                                    "type": "string",
                                    "description": "updatedAt",
                                    "x-ms-summary": "updatedAt"
                                }
                            }
                        }
                    }
                },
                "deprecated": false,
                "x-ms-visibility": "important"
            }
        },
        "/auth/logout": {
            "get": {
                "tags": [],
                "summary": "GET /auth/logout",
                "description": "GET /auth/logout",
                "operationId": "GET/auth/logout",
                "consumes": [],
                "parameters": [],
                "produces": [
                    "text/html; charset=UTF-8"
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {}
                    }
                },
                "deprecated": false,
                "x-ms-visibility": "important"
            }
        },
        "/productos": {
            "get": {
                "tags": [],
                "summary": "GET /productos",
                "description": "GET /productos",
                "operationId": "GET/productos",
                "consumes": [],
                "parameters": [],
                "produces": [
                    "application/json; charset=utf-8"
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "success": {
                                    "type": "boolean",
                                    "description": "success",
                                    "x-ms-summary": "success"
                                },
                                "result": {
                                    "type": "array",
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "_id": {
                                                "type": "string",
                                                "description": "_id",
                                                "x-ms-summary": "_id"
                                            },
                                            "name": {
                                                "type": "string",
                                                "description": "name",
                                                "x-ms-summary": "name"
                                            },
                                            "details": {
                                                "type": "string",
                                                "description": "details",
                                                "x-ms-summary": "details"
                                            },
                                            "url": {
                                                "type": "string",
                                                "description": "url",
                                                "x-ms-summary": "url"
                                            },
                                            "code": {
                                                "type": "string",
                                                "description": "code",
                                                "x-ms-summary": "code"
                                            },
                                            "category": {
                                                "type": "string",
                                                "description": "category",
                                                "x-ms-summary": "category"
                                            },
                                            "price": {
                                                "type": "integer",
                                                "description": "price",
                                                "x-ms-summary": "price"
                                            },
                                            "stock": {
                                                "type": "integer",
                                                "description": "stock",
                                                "x-ms-summary": "stock"
                                            },
                                            "createdAt": {
                                                "type": "string",
                                                "description": "createdAt",
                                                "x-ms-summary": "createdAt"
                                            },
                                            "updatedAt": {
                                                "type": "string",
                                                "description": "updatedAt",
                                                "x-ms-summary": "updatedAt"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "deprecated": false,
                "x-ms-visibility": "important"
            }
        },
        "/productos/": {
            "get": {
                "tags": [],
                "summary": "GET /productos/",
                "description": "GET /productos/",
                "operationId": "GET/productos/",
                "consumes": [],
                "parameters": [],
                "produces": [
                    "application/json; charset=utf-8"
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "success": {
                                    "type": "boolean",
                                    "description": "success",
                                    "x-ms-summary": "success"
                                },
                                "result": {
                                    "type": "array",
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "_id": {
                                                "type": "string",
                                                "description": "_id",
                                                "x-ms-summary": "_id"
                                            },
                                            "name": {
                                                "type": "string",
                                                "description": "name",
                                                "x-ms-summary": "name"
                                            },
                                            "details": {
                                                "type": "string",
                                                "description": "details",
                                                "x-ms-summary": "details"
                                            },
                                            "url": {
                                                "type": "string",
                                                "description": "url",
                                                "x-ms-summary": "url"
                                            },
                                            "code": {
                                                "type": "string",
                                                "description": "code",
                                                "x-ms-summary": "code"
                                            },
                                            "category": {
                                                "type": "string",
                                                "description": "category",
                                                "x-ms-summary": "category"
                                            },
                                            "price": {
                                                "type": "integer",
                                                "description": "price",
                                                "x-ms-summary": "price"
                                            },
                                            "stock": {
                                                "type": "integer",
                                                "description": "stock",
                                                "x-ms-summary": "stock"
                                            },
                                            "createdAt": {
                                                "type": "string",
                                                "description": "createdAt",
                                                "x-ms-summary": "createdAt"
                                            },
                                            "updatedAt": {
                                                "type": "string",
                                                "description": "updatedAt",
                                                "x-ms-summary": "updatedAt"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "deprecated": false,
                "x-ms-visibility": "important"
            },
            "post": {
                "tags": [],
                "summary": "POST /productos/",
                "description": "POST /productos/",
                "operationId": "POST/productos/",
                "consumes": [],
                "parameters": [
                    {
                        "name": "__requested_body__",
                        "in": "body",
                        "description": "request body",
                        "x-ms-summary": "request body",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "name": {
                                    "type": "string",
                                    "description": "name",
                                    "x-ms-summary": "name"
                                },
                                "detail": {
                                    "type": "string",
                                    "description": "detail",
                                    "x-ms-summary": "detail"
                                },
                                "foto": {
                                    "type": "string",
                                    "description": "foto",
                                    "x-ms-summary": "foto"
                                },
                                "code": {
                                    "type": "string",
                                    "description": "code",
                                    "x-ms-summary": "code"
                                },
                                "categoria": {
                                    "type": "string",
                                    "description": "categoria",
                                    "x-ms-summary": "categoria"
                                },
                                "precio": {
                                    "type": "integer",
                                    "description": "precio",
                                    "x-ms-summary": "precio"
                                },
                                "stock": {
                                    "type": "integer",
                                    "description": "stock",
                                    "x-ms-summary": "stock"
                                },
                                "price": {
                                    "type": "integer",
                                    "description": "price",
                                    "x-ms-summary": "price"
                                },
                                "category": {
                                    "type": "string",
                                    "description": "category",
                                    "x-ms-summary": "category"
                                }
                            }
                        }
                    }
                ],
                "produces": [
                    "application/json; charset=utf-8"
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "success": {
                                    "type": "boolean",
                                    "description": "success",
                                    "x-ms-summary": "success"
                                },
                                "result": {
                                    "type": "object",
                                    "properties": {
                                        "name": {
                                            "type": "string",
                                            "description": "name",
                                            "x-ms-summary": "name"
                                        },
                                        "code": {
                                            "type": "string",
                                            "description": "code",
                                            "x-ms-summary": "code"
                                        },
                                        "category": {
                                            "type": "string",
                                            "description": "category",
                                            "x-ms-summary": "category"
                                        },
                                        "price": {
                                            "type": "integer",
                                            "description": "price",
                                            "x-ms-summary": "price"
                                        },
                                        "stock": {
                                            "type": "integer",
                                            "description": "stock",
                                            "x-ms-summary": "stock"
                                        },
                                        "_id": {
                                            "type": "string",
                                            "description": "_id",
                                            "x-ms-summary": "_id"
                                        },
                                        "createdAt": {
                                            "type": "string",
                                            "description": "createdAt",
                                            "x-ms-summary": "createdAt"
                                        },
                                        "updatedAt": {
                                            "type": "string",
                                            "description": "updatedAt",
                                            "x-ms-summary": "updatedAt"
                                        },
                                        "__v": {
                                            "type": "integer",
                                            "description": "__v",
                                            "x-ms-summary": "__v"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "deprecated": false,
                "x-ms-visibility": "important"
            }
        },
        "/productos/ssfsd": {
            "put": {
                "tags": [],
                "summary": "PUT /productos/ssfsd",
                "description": "PUT /productos/ssfsd",
                "operationId": "PUT/productos/ssfsd",
                "consumes": [],
                "parameters": [
                    {
                        "name": "__requested_body__",
                        "in": "body",
                        "description": "request body",
                        "x-ms-summary": "request body",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "price": {
                                    "type": "decimal",
                                    "description": "price",
                                    "x-ms-summary": "price"
                                }
                            }
                        }
                    }
                ],
                "produces": [
                    "text/html; charset=utf-8"
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {}
                    }
                },
                "deprecated": false,
                "x-ms-visibility": "important"
            }
        },
        "/productos/62ec2c8ecc5af08ee35a95a9": {
            "delete": {
                "tags": [],
                "summary": "DELETE /productos/62ec2c8ecc5af08ee35a95a9",
                "description": "DELETE /productos/62ec2c8ecc5af08ee35a95a9",
                "operationId": "DELETE/productos/62ec2c8ecc5af08ee35a95a9",
                "consumes": [],
                "parameters": [],
                "produces": [
                    "text/html; charset=utf-8"
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {}
                    }
                },
                "deprecated": false,
                "x-ms-visibility": "important"
            }
        },
        "/carrito/": {
            "get": {
                "tags": [],
                "summary": "GET /carrito/",
                "description": "GET /carrito/",
                "operationId": "GET/carrito/",
                "consumes": [],
                "parameters": [],
                "produces": [
                    "application/json; charset=utf-8"
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "success": {
                                    "type": "boolean",
                                    "description": "success",
                                    "x-ms-summary": "success"
                                },
                                "result": {
                                    "type": "object",
                                    "properties": {
                                        "_id": {
                                            "type": "string",
                                            "description": "_id",
                                            "x-ms-summary": "_id"
                                        },
                                        "userId": {
                                            "type": "string",
                                            "description": "userId",
                                            "x-ms-summary": "userId"
                                        },
                                        "items": {
                                            "type": "array",
                                            "items": {}
                                        },
                                        "subTotal": {
                                            "type": "integer",
                                            "description": "subTotal",
                                            "x-ms-summary": "subTotal"
                                        },
                                        "createdAt": {
                                            "type": "string",
                                            "description": "createdAt",
                                            "x-ms-summary": "createdAt"
                                        },
                                        "updatedAt": {
                                            "type": "string",
                                            "description": "updatedAt",
                                            "x-ms-summary": "updatedAt"
                                        },
                                        "id": {
                                            "type": "string",
                                            "description": "id",
                                            "x-ms-summary": "id"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "deprecated": false,
                "x-ms-visibility": "important"
            },
            "post": {
                "tags": [],
                "summary": "POST /carrito/",
                "description": "POST /carrito/",
                "operationId": "POST/carrito/",
                "consumes": [],
                "parameters": [
                    {
                        "name": "__requested_body__",
                        "in": "body",
                        "description": "request body",
                        "x-ms-summary": "request body",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "productId": {
                                    "type": "string",
                                    "description": "productId",
                                    "x-ms-summary": "productId"
                                },
                                "quantity": {
                                    "type": "integer",
                                    "description": "quantity",
                                    "x-ms-summary": "quantity"
                                }
                            }
                        }
                    }
                ],
                "produces": [
                    "application/json; charset=utf-8"
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "success": {
                                    "type": "boolean",
                                    "description": "success",
                                    "x-ms-summary": "success"
                                },
                                "result": {
                                    "type": "object",
                                    "properties": {
                                        "_id": {
                                            "type": "string",
                                            "description": "_id",
                                            "x-ms-summary": "_id"
                                        },
                                        "userId": {
                                            "type": "string",
                                            "description": "userId",
                                            "x-ms-summary": "userId"
                                        },
                                        "items": {
                                            "type": "array",
                                            "items": {
                                                "type": "object",
                                                "properties": {
                                                    "productId": {
                                                        "type": "string",
                                                        "description": "productId",
                                                        "x-ms-summary": "productId"
                                                    },
                                                    "quantity": {
                                                        "type": "integer",
                                                        "description": "quantity",
                                                        "x-ms-summary": "quantity"
                                                    },
                                                    "price": {
                                                        "type": "integer",
                                                        "description": "price",
                                                        "x-ms-summary": "price"
                                                    },
                                                    "name": {
                                                        "type": "string",
                                                        "description": "name",
                                                        "x-ms-summary": "name"
                                                    },
                                                    "details": {
                                                        "type": "string",
                                                        "description": "details",
                                                        "x-ms-summary": "details"
                                                    },
                                                    "url": {
                                                        "type": "string",
                                                        "description": "url",
                                                        "x-ms-summary": "url"
                                                    },
                                                    "total": {
                                                        "type": "integer",
                                                        "description": "total",
                                                        "x-ms-summary": "total"
                                                    },
                                                    "_id": {
                                                        "type": "string",
                                                        "description": "_id",
                                                        "x-ms-summary": "_id"
                                                    },
                                                    "updatedAt": {
                                                        "type": "string",
                                                        "description": "updatedAt",
                                                        "x-ms-summary": "updatedAt"
                                                    },
                                                    "createdAt": {
                                                        "type": "string",
                                                        "description": "createdAt",
                                                        "x-ms-summary": "createdAt"
                                                    }
                                                }
                                            }
                                        },
                                        "subTotal": {
                                            "type": "integer",
                                            "description": "subTotal",
                                            "x-ms-summary": "subTotal"
                                        },
                                        "createdAt": {
                                            "type": "string",
                                            "description": "createdAt",
                                            "x-ms-summary": "createdAt"
                                        },
                                        "updatedAt": {
                                            "type": "string",
                                            "description": "updatedAt",
                                            "x-ms-summary": "updatedAt"
                                        },
                                        "id": {
                                            "type": "string",
                                            "description": "id",
                                            "x-ms-summary": "id"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "deprecated": false,
                "x-ms-visibility": "important"
            },
            "put": {
                "tags": [],
                "summary": "PUT /carrito/",
                "description": "PUT /carrito/",
                "operationId": "PUT/carrito/",
                "consumes": [],
                "parameters": [
                    {
                        "name": "__requested_body__",
                        "in": "body",
                        "description": "request body",
                        "x-ms-summary": "request body",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "productId": {
                                    "type": "string",
                                    "description": "productId",
                                    "x-ms-summary": "productId"
                                },
                                "quantity": {
                                    "type": "integer",
                                    "description": "quantity",
                                    "x-ms-summary": "quantity"
                                }
                            }
                        }
                    }
                ],
                "produces": [
                    "text/html; charset=utf-8"
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {}
                    }
                },
                "deprecated": false,
                "x-ms-visibility": "important"
            }
        },
        "/carrito/clear": {
            "post": {
                "tags": [],
                "summary": "POST /carrito/clear",
                "description": "POST /carrito/clear",
                "operationId": "POST/carrito/clear",
                "consumes": [],
                "parameters": [],
                "produces": [
                    "application/json; charset=utf-8"
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "success": {
                                    "type": "boolean",
                                    "description": "success",
                                    "x-ms-summary": "success"
                                },
                                "result": {
                                    "type": "object",
                                    "properties": {
                                        "_id": {
                                            "type": "string",
                                            "description": "_id",
                                            "x-ms-summary": "_id"
                                        },
                                        "userId": {
                                            "type": "string",
                                            "description": "userId",
                                            "x-ms-summary": "userId"
                                        },
                                        "items": {
                                            "type": "array",
                                            "items": {}
                                        },
                                        "subTotal": {
                                            "type": "integer",
                                            "description": "subTotal",
                                            "x-ms-summary": "subTotal"
                                        },
                                        "createdAt": {
                                            "type": "string",
                                            "description": "createdAt",
                                            "x-ms-summary": "createdAt"
                                        },
                                        "updatedAt": {
                                            "type": "string",
                                            "description": "updatedAt",
                                            "x-ms-summary": "updatedAt"
                                        },
                                        "id": {
                                            "type": "string",
                                            "description": "id",
                                            "x-ms-summary": "id"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "deprecated": false,
                "x-ms-visibility": "important"
            }
        },
        "/carrito/62da96d08d86831761bc945d": {
            "delete": {
                "tags": [],
                "summary": "DELETE /carrito/62da96d08d86831761bc945d",
                "description": "DELETE /carrito/62da96d08d86831761bc945d",
                "operationId": "DELETE/carrito/62da96d08d86831761bc945d",
                "consumes": [],
                "parameters": [],
                "produces": [
                    "application/json; charset=utf-8"
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "success": {
                                    "type": "boolean",
                                    "description": "success",
                                    "x-ms-summary": "success"
                                },
                                "result": {
                                    "type": "object",
                                    "properties": {
                                        "_id": {
                                            "type": "string",
                                            "description": "_id",
                                            "x-ms-summary": "_id"
                                        },
                                        "userId": {
                                            "type": "string",
                                            "description": "userId",
                                            "x-ms-summary": "userId"
                                        },
                                        "items": {
                                            "type": "array",
                                            "items": {}
                                        },
                                        "subTotal": {
                                            "type": "integer",
                                            "description": "subTotal",
                                            "x-ms-summary": "subTotal"
                                        },
                                        "createdAt": {
                                            "type": "string",
                                            "description": "createdAt",
                                            "x-ms-summary": "createdAt"
                                        },
                                        "updatedAt": {
                                            "type": "string",
                                            "description": "updatedAt",
                                            "x-ms-summary": "updatedAt"
                                        },
                                        "id": {
                                            "type": "string",
                                            "description": "id",
                                            "x-ms-summary": "id"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "deprecated": false,
                "x-ms-visibility": "important"
            }
        },
        "/checkout": {
            "post": {
                "tags": [],
                "summary": "POST /checkout",
                "description": "POST /checkout",
                "operationId": "POST/checkout",
                "consumes": [],
                "parameters": [],
                "produces": [
                    "application/json; charset=utf-8"
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "success": {
                                    "type": "boolean",
                                    "description": "success",
                                    "x-ms-summary": "success"
                                },
                                "result": {
                                    "type": "object",
                                    "properties": {
                                        "userId": {
                                            "type": "string",
                                            "description": "userId",
                                            "x-ms-summary": "userId"
                                        },
                                        "email": {
                                            "type": "string",
                                            "description": "email",
                                            "x-ms-summary": "email"
                                        },
                                        "adress": {
                                            "type": "string",
                                            "description": "adress",
                                            "x-ms-summary": "adress"
                                        },
                                        "phone": {
                                            "type": "string",
                                            "description": "phone",
                                            "x-ms-summary": "phone"
                                        },
                                        "name": {
                                            "type": "string",
                                            "description": "name",
                                            "x-ms-summary": "name"
                                        },
                                        "items": {
                                            "type": "array",
                                            "items": {
                                                "type": "object",
                                                "properties": {
                                                    "productId": {
                                                        "type": "string",
                                                        "description": "productId",
                                                        "x-ms-summary": "productId"
                                                    },
                                                    "quantity": {
                                                        "type": "integer",
                                                        "description": "quantity",
                                                        "x-ms-summary": "quantity"
                                                    },
                                                    "price": {
                                                        "type": "integer",
                                                        "description": "price",
                                                        "x-ms-summary": "price"
                                                    },
                                                    "name": {
                                                        "type": "string",
                                                        "description": "name",
                                                        "x-ms-summary": "name"
                                                    },
                                                    "details": {
                                                        "type": "string",
                                                        "description": "details",
                                                        "x-ms-summary": "details"
                                                    },
                                                    "url": {
                                                        "type": "string",
                                                        "description": "url",
                                                        "x-ms-summary": "url"
                                                    },
                                                    "total": {
                                                        "type": "integer",
                                                        "description": "total",
                                                        "x-ms-summary": "total"
                                                    },
                                                    "_id": {
                                                        "type": "string",
                                                        "description": "_id",
                                                        "x-ms-summary": "_id"
                                                    },
                                                    "updatedAt": {
                                                        "type": "string",
                                                        "description": "updatedAt",
                                                        "x-ms-summary": "updatedAt"
                                                    },
                                                    "createdAt": {
                                                        "type": "string",
                                                        "description": "createdAt",
                                                        "x-ms-summary": "createdAt"
                                                    }
                                                }
                                            }
                                        },
                                        "subTotal": {
                                            "type": "integer",
                                            "description": "subTotal",
                                            "x-ms-summary": "subTotal"
                                        },
                                        "state": {
                                            "type": "string",
                                            "description": "state",
                                            "x-ms-summary": "state"
                                        },
                                        "_id": {
                                            "type": "string",
                                            "description": "_id",
                                            "x-ms-summary": "_id"
                                        },
                                        "createdAt": {
                                            "type": "string",
                                            "description": "createdAt",
                                            "x-ms-summary": "createdAt"
                                        },
                                        "updatedAt": {
                                            "type": "string",
                                            "description": "updatedAt",
                                            "x-ms-summary": "updatedAt"
                                        },
                                        "orderNumber": {
                                            "type": "integer",
                                            "description": "orderNumber",
                                            "x-ms-summary": "orderNumber"
                                        },
                                        "__v": {
                                            "type": "integer",
                                            "description": "__v",
                                            "x-ms-summary": "__v"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "deprecated": false,
                "x-ms-visibility": "important"
            }
        }
    },
    "definitions": {}
}