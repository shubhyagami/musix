package com.coderunner.model;

public class AiFeedbackRequest {
    private String code;
    private String output;
    private String stdin;
    private String error;

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
    public String getOutput() { return output; }
    public void setOutput(String output) { this.output = output; }
    public String getStdin() { return stdin; }
    public void setStdin(String stdin) { this.stdin = stdin; }
    public String getError() { return error; }
    public void setError(String error) { this.error = error; }
}
