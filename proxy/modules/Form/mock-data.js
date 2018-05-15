module.exports = {
  "POST:/form/template": (req, res)=>{
    res.status(200).send({
      "id":"pep-form-workflow",
      "name":"表单1",
      "type":"QUESTION",
      "sequenceNumber":1,
      "description":null,
      "enable":true,
      "version":1
    });
  },
  "GET:/form/template":[
    {"id":"pep-form-workflow","name":"表单1","type":"QUESTION","sequenceNumber":1,"description":null,"enable":true,"version":1,"formDetails":{"formJson":[{"label":"文本域","key":"TextArea","component":{"name":"TextArea"},"name":"ydPxH"},{"label":"输入框","key":"Input","component":{"name":"Input"},"name":"PgK8u"}],"formLayout":"horizontal","formTitle":"我的表单"},},
    {"id":"pep-form-form","name":"表单2","type":"WORKFLOW","sequenceNumber":2,"description":null,"enable":true,"version":1},
    {"id":"pep-form-users","name":"表单3","type":"QUESTION","sequenceNumber":3,"description":null,"enable":true,"version":1},
  ],
  "DELETE:/form/template/:id": (req, res)=>{
    res.status(200).send({
        "status":"ok",
    });
  },
  "GET:/form/template/:id": (req, res)=>{
    res.status(200).send({
      "id":"pep-form-workflow",
      "name":"表单6666",
      "type":"WORKFLOW",
      "sequenceNumber":1,
      "description":null,
      "enable":true,
      "formDetails":{"formJson":[{"label":"文本域","key":"TextArea","component":{"name":"TextArea"},"name":"ydPxH"},{"label":"输入框","key":"Input","component":{"name":"Input"},"name":"PgK8u"}],"formLayout":"horizontal"},
      "version":1
    });
  },
  "PUT:/form/template/:id": (req, res)=>{
    res.status(200).send({"id":"pep-form-workflow","name":"表单6666","type":"WORKFLOW","sequenceNumber":1,"description":null,"enable":true,"version":1});
  },
  "PUT:/form/template/:id/formDetails": (req, res)=>{
    res.status(200).send({
      "status":"ok",
    });
  },
}
