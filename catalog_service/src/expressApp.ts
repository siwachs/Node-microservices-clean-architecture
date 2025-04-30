import express from "express";

import catalogRouter from "./api/catalog.routes";
import { httpLogger, HandleErrorWithLogger } from "./utils";
import { ElasticSearchService } from "./services/elasticsearch.service";
import { AppEventListener } from "./utils/ElasticSearchListener";

const app = express();
app.use(express.json());
app.use(httpLogger);

const elasticsearchService = new ElasticSearchService();
AppEventListener.getInstance().listen(elasticsearchService);

app.use("/", catalogRouter);

app.use(HandleErrorWithLogger);

export default app;
