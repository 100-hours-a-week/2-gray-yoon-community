const BASE_URL = "/data"; // API 서버의 기본 URL

/**
 * HTTP 요청을 보내는 함수
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

  // URL 파라미터 처리
  const queryString = params
    ? `?${new URLSearchParams(params).toString()}`
    : "";

  // 요청 URL 생성
  const url = `${BASE_URL}${path}${queryString}`;

  // 기본 헤더 설정
  const defaultHeaders = {
    "Content-Type": "application/json",
    // 필요한 경우 인증 토큰 추가
    ...(localStorage.getItem("token") && {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    }),
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

    // 응답이 ok가 아닌 경우 (상태 코드가 200-299 범위를 벗어난 경우)
    if (!response.ok) {
      const errorData = await response.json();
      throw {
        status: response.status,
        statusText: response.statusText,
        data: errorData,
      };
    }

    // 응답 데이터가 없는 경우 (204 No Content 등)
    if (response.status === 204) {
      return null;
    }

    // JSON 응답 파싱
    const responseData = await response.json();

    return responseData;
  } catch (error) {
    // 네트워크 오류나 파싱 오류 처리
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
