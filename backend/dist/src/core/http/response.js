export const response = {
    success(res, data, message = "Request successful") {
        return res.status(200).json({
            success: true,
            message,
            data,
        });
    },
    created(res, data, message = "Resource created successfully") {
        return res.status(201).json({
            success: true,
            message,
            data,
        });
    },
    error(res, message = "Request failed", statusCode = 400, code = "REQUEST_ERROR") {
        return res.status(statusCode).json({
            success: false,
            message,
            code,
        });
    },
    noContent(res) {
        return res.status(204).send();
    },
};
