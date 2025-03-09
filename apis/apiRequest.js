const BASE_URL = "/data";

/**
 * @param {string} path - API 엔드포인트 경로
 * @param {string} method - HTTP 메서드 (GET, POST, PUT, DELETE 등)
 * @param {Object} options - 요청 옵션
 * @param {Object} [options.data] - 요청 본문 데이터
 * @param {Object} [options.params] - URL 쿼리 파라미터
 * @param {Object} [options.headers] - 요청 헤더
 * @returns {Promise} - API 응답 데이터
 */
export const apiRequest = async (path, method = "GET", options = {}) => {
  const { data, params, headers = {} } = options;

  const queryString = params
    ? `?${new URLSearchParams(params).toString()}`
    : "";

  const url = `${BASE_URL}${path}${queryString}`;

  const defaultHeaders = {
    "Content-Type": "application/json",
    // 필요한 경우 인증 토큰 추가
    // ...(localStorage.getItem("token") && {
    //   Authorization: `Bearer ${localStorage.getItem("token")}`,
    // }),
  };

  try {
    const response = await fetch(url, {
      method,
      headers: {
        ...defaultHeaders,
        ...headers,
      },
      ...(data && { body: JSON.stringify(data) }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw {
        status: response.status,
        statusText: response.statusText,
        data: errorData,
      };
    }

    if (response.status === 204) {
      return null;
    }

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    if (error instanceof TypeError) {
      throw {
        status: 0,
        statusText: "Network Error",
        data: error.message,
      };
    }
    throw error;
  }
};
