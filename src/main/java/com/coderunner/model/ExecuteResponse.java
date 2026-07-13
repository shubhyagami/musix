package com.coderunner.model;

public class ExecuteResponse {
    private String output;
    private boolean success;

    public ExecuteResponse(String output, boolean success) {
        this.output = output;
        this.success = success;
    }

    public String getOutput() { return output; }
    public boolean isSuccess() { return success; }
}
