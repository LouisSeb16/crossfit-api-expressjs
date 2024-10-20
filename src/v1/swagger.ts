import { Request, RequestHandler, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    definition: {
        openapi: "3.0.0",
        info: { title: "Crossfit WOD API", version: "1.0.0", description: 'API documentation for the Workout application', },
    },
    apis: ["./src/docs/apiDocs.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app: { use: (arg0: string, arg1: RequestHandler<ParamsDictionary, any, any, ParsedQs, Record<string, any>>[], arg2: RequestHandler<ParamsDictionary, any, any, ParsedQs, Record<string, any>>) => void; get: (arg0: string, arg1: (req: any, res: any) => void) => void; }, port: any) => {

    app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    app.get("/api/v1/docs.json", (req: Request, res: Response) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });

    console.log(
        `Version 1 Docs are available on http://localhost:${port}/api/v1/docs`
    );
};

export default swaggerDocs;