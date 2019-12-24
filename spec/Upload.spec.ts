import app from '@server';
import supertest from 'supertest';

import { BAD_REQUEST, CREATED, OK, EXPECTATION_FAILED } from 'http-status-codes';
import { Response, SuperTest, Test, Request } from 'supertest';
import { login } from './support/LoginAgent';
import {
  paramMissingError, pErr,
} from '@shared';

describe(`UploadRouter`, () => {
  const uploadPath = '/upload';
  const addUploadPath = '/api/upload';

  let agent: SuperTest<Test>;
  let jwtCookie: string;


  beforeAll((done) => {
    agent = supertest.agent(app);
    login(agent, (cookie: string) => {
      jwtCookie = cookie;
      done();
    });
  });

  describe(`"GET:${uploadPath}"`, () => {
    const callApi = () => {
      return agent.get(uploadPath).set('Cookie', jwtCookie);
    };

    it(`should return a HTML and status code of "${OK}" if the request was successful.`, async () => {
      callApi()
      .end((err: Error, res: Response) => {
        expect(res.status).toBe(OK);
        // console.log(res.text);
        expect(res.text).toEqual(expect.stringContaining('<title>Upload</title>'));
      });
    });
  });

  describe(`"POST:${addUploadPath}"`, () => {
    const callApi = () => {
      return agent.post(addUploadPath).set('Cookie', jwtCookie);
    };

    it(`should return a status code of "${CREATED}" if the request was successful.`, (done: void) => {
      callApi()
      // TODO: change reail apk_file and json_file
      .attach('apk_file', './tsconfig.json')
      .attach('json_file', './tsconfig.json')
      .end((err: Error, res: Response) => {
        pErr(err);
        expect(res.status).toBe(CREATED);
        expect(res.body.error).toBeUndefined();
        done();
      });
    });

    it(`should return a JSON object with an error message of "${paramMissingError}" and a status code of "${BAD_REQUEST}" if the upload param was missing.`, (done: function) => {
      callApi()
      .end((err: Error, res: Response) => {
        pErr(err);
        expect(res.status).toBe(BAD_REQUEST);
        expect(res.body.error).toBe(paramMissingError);
        done();
      });
    });

    it(`should return a JSON object with an error message of "${paramMissingError}" and a status code of "${BAD_REQUEST}" if the upload "apk_file" param was missing.`, (done: function) => {
      callApi()
      .attach('apk_file', './tsconfig.json')
      .end((err: Error, res: Response) => {
        pErr(err);
        expect(res.status).toBe(BAD_REQUEST);
        expect(res.body.error).toBe(paramMissingError);
        done();
      });
    });

    it(`should return a JSON object with an error message of "${paramMissingError}" and a status code of "${BAD_REQUEST}" if the upload "json_file" param was missing.`, (done: function) => {
      callApi()
      .attach('json_file', './tsconfig.json')
      .end((err: Error, res: Response) => {
        pErr(err);
        expect(res.status).toBe(BAD_REQUEST);
        expect(res.body.error).toBe(paramMissingError);
        done();
      });
    });
  });
});
